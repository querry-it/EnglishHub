ALTER TABLE "flashcard_reviews"
ADD COLUMN "definition" TEXT,
ADD COLUMN "example" TEXT,
ADD COLUMN "image_url" VARCHAR(500),
ADD COLUMN "audio_url" VARCHAR(500);
