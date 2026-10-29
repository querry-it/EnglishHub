import base64
import io
import json
import os
from pathlib import Path

import numpy as np
import soundfile as sf
import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from transformers import AutoFeatureExtractor, Wav2Vec2Model
from torch import nn


MODEL_DIR = Path(__file__).resolve().parents[1] / "models" / "pronunciation"
CHECKPOINT_PATH = MODEL_DIR / "score_regressor.pt"
METADATA_PATH = MODEL_DIR / "metadata.json"
SAMPLE_RATE = 16_000
TARGET_COLUMNS = ["accuracy", "completeness", "fluency", "prosodic", "total"]
MAX_AUDIO_BYTES = 1_200_000
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class ScoreRegressor(nn.Module):
    def __init__(self, input_size: int, output_size: int) -> None:
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(input_size, 256),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.15),
            nn.Linear(128, output_size),
            nn.Sigmoid(),
        )

    def forward(self, features: torch.Tensor) -> torch.Tensor:
        return self.layers(features)


class AssessmentRequest(BaseModel):
    audioBase64: str = Field(min_length=1, max_length=1_600_000)
    sampleRate: int


app = FastAPI(title="EnglishHub Pronunciation Model", docs_url=None, redoc_url=None)
feature_extractor = None
encoder = None
score_regressor = None
metadata = None


@app.on_event("startup")
def load_models() -> None:
    global feature_extractor, encoder, score_regressor, metadata

    if not CHECKPOINT_PATH.is_file() or not METADATA_PATH.is_file():
        raise RuntimeError(f"Pronunciation model files are missing from {MODEL_DIR}")

    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    if metadata.get("sample_rate") != SAMPLE_RATE:
        raise RuntimeError("Model metadata has an unsupported sample rate")
    if metadata.get("target_columns") != TARGET_COLUMNS:
        raise RuntimeError("Model metadata target order does not match the inference API")

    checkpoint = torch.load(CHECKPOINT_PATH, map_location="cpu", weights_only=True)
    if checkpoint.get("encoder_name") != metadata.get("encoder"):
        raise RuntimeError("Checkpoint encoder does not match model metadata")
    if checkpoint.get("target_columns") != TARGET_COLUMNS:
        raise RuntimeError("Checkpoint target order does not match the inference API")

    feature_extractor = AutoFeatureExtractor.from_pretrained(metadata["encoder"])
    encoder = Wav2Vec2Model.from_pretrained(metadata["encoder"]).to(DEVICE)
    encoder.eval()
    for parameter in encoder.parameters():
        parameter.requires_grad = False

    score_regressor = ScoreRegressor(
        int(checkpoint["embedding_size"]),
        len(TARGET_COLUMNS),
    ).to(DEVICE)
    score_regressor.load_state_dict(checkpoint["head_state_dict"])
    score_regressor.eval()


@app.get("/health")
def health() -> dict[str, str]:
    if encoder is None or score_regressor is None:
        raise HTTPException(status_code=503, detail="Pronunciation model is not loaded")
    return {"status": "ready", "device": str(DEVICE)}


@app.post("/assess")
def assess(request: AssessmentRequest) -> dict[str, object]:
    if encoder is None or feature_extractor is None or score_regressor is None:
        raise HTTPException(status_code=503, detail="Pronunciation model is not loaded")
    if request.sampleRate != SAMPLE_RATE:
        raise HTTPException(status_code=400, detail=f"Audio must be {SAMPLE_RATE} Hz")

    try:
        audio_bytes = base64.b64decode(request.audioBase64, validate=True)
    except (ValueError, base64.binascii.Error) as error:
        raise HTTPException(status_code=400, detail="Audio must be valid base64") from error

    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Audio is too large; record a shorter sentence")

    try:
        waveform, sample_rate = sf.read(
            io.BytesIO(audio_bytes),
            dtype="float32",
            always_2d=False,
        )
    except (RuntimeError, ValueError, sf.LibsndfileError) as error:
        raise HTTPException(status_code=400, detail="Audio must be a valid WAV file") from error

    waveform = np.asarray(waveform, dtype=np.float32)
    if waveform.ndim != 1 or waveform.size == 0:
        raise HTTPException(status_code=400, detail="Audio must be non-empty mono audio")
    if sample_rate != SAMPLE_RATE:
        raise HTTPException(status_code=400, detail=f"Audio must be {SAMPLE_RATE} Hz")
    if not np.isfinite(waveform).all():
        raise HTTPException(status_code=400, detail="Audio contains invalid sample values")
    if waveform.size > SAMPLE_RATE * 30:
        raise HTTPException(status_code=413, detail="Audio must be 30 seconds or shorter")
    if float(np.sqrt(np.mean(np.square(waveform)))) < 1e-4:
        raise HTTPException(status_code=422, detail="No clear speech was detected in the recording")

    inputs = feature_extractor(
        waveform,
        sampling_rate=SAMPLE_RATE,
        return_attention_mask=True,
        return_tensors="pt",
    )
    inputs = {key: value.to(DEVICE) for key, value in inputs.items()}

    with torch.inference_mode():
        hidden = encoder(**inputs).last_hidden_state
        frame_mask = encoder._get_feature_vector_attention_mask(
            hidden.shape[1],
            inputs["attention_mask"],
        ).unsqueeze(-1)
        pooled = (hidden * frame_mask).sum(dim=1) / frame_mask.sum(dim=1).clamp(min=1)
        values = (
            score_regressor(pooled).squeeze(0).cpu().numpy() * 10.0
        ).clip(0.0, 10.0)

    scores = {
        name: round(float(value), 2)
        for name, value in zip(TARGET_COLUMNS, values)
    }
    return {
        "scores": scores,
        "scope": "sentence",
        "notice": "AI estimate trained on SpeechOcean762; not validated for Vietnamese learners.",
    }
