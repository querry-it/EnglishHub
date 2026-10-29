const TARGET_SAMPLE_RATE = 16000;

const encodePcmWav = (samples, sampleRate) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeText = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };

  writeText(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeText(8, 'WAVE');
  writeText(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (const sample of samples) {
    const clipped = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
};

const blobToBase64 = async (blob) => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
};

export const convertRecordingToWavBase64 = async (recordingBlob) => {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor || !window.OfflineAudioContext) {
    throw new Error('Trình duyệt hiện tại không hỗ trợ xử lý audio để chấm phát âm.');
  }

  const decodingContext = new AudioContextConstructor();
  let decodedAudio;
  try {
    decodedAudio = await decodingContext.decodeAudioData(await recordingBlob.arrayBuffer());
  } finally {
    await decodingContext.close();
  }

  if (decodedAudio.duration > 30) {
    throw new Error('Mỗi câu ghi âm tối đa 30 giây. Hãy thử lại với câu ngắn hơn.');
  }

  const outputLength = Math.ceil(decodedAudio.duration * TARGET_SAMPLE_RATE);
  const offlineContext = new OfflineAudioContext(1, outputLength, TARGET_SAMPLE_RATE);
  const monoBuffer = offlineContext.createBuffer(1, decodedAudio.length, decodedAudio.sampleRate);
  const monoSamples = monoBuffer.getChannelData(0);

  for (let channel = 0; channel < decodedAudio.numberOfChannels; channel += 1) {
    const channelSamples = decodedAudio.getChannelData(channel);
    for (let index = 0; index < channelSamples.length; index += 1) {
      monoSamples[index] += channelSamples[index] / decodedAudio.numberOfChannels;
    }
  }

  const source = offlineContext.createBufferSource();
  source.buffer = monoBuffer;
  source.connect(offlineContext.destination);
  source.start();

  const resampledAudio = await offlineContext.startRendering();
  const wavBlob = encodePcmWav(resampledAudio.getChannelData(0), TARGET_SAMPLE_RATE);
  return {
    audioBase64: await blobToBase64(wavBlob),
    sampleRate: TARGET_SAMPLE_RATE
  };
};
