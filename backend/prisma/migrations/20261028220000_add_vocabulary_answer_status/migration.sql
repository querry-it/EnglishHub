ALTER TABLE "vocabulary_progress"
ADD COLUMN "is_correct" BOOLEAN NOT NULL DEFAULT false;

UPDATE "vocabulary_progress" AS progress
SET "is_correct" = EXISTS (
    SELECT 1
    FROM "flashcard_reviews" AS flashcard
    JOIN "master_vocabulary" AS vocabulary
      ON LOWER(vocabulary."word") = LOWER(flashcard."word")
    WHERE flashcard."user_id" = progress."user_id"
      AND vocabulary."id" = progress."vocabulary_id"
      AND flashcard."repetition_count" > 0
);
