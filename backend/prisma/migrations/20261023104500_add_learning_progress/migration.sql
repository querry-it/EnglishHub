CREATE TABLE "course_lesson_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_key" VARCHAR(255) NOT NULL,
    "lesson_key" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "course_lesson_progress_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "vocabulary_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "vocabulary_id" UUID NOT NULL,
    "review_count" INTEGER NOT NULL DEFAULT 1,
    "first_reviewed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_reviewed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocabulary_progress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "course_lesson_progress_user_id_course_key_lesson_key_key"
ON "course_lesson_progress"("user_id", "course_key", "lesson_key");
CREATE INDEX "course_lesson_progress_user_id_course_key_completed_idx"
ON "course_lesson_progress"("user_id", "course_key", "completed");

CREATE UNIQUE INDEX "vocabulary_progress_user_id_vocabulary_id_key"
ON "vocabulary_progress"("user_id", "vocabulary_id");
CREATE INDEX "vocabulary_progress_user_id_last_reviewed_at_idx"
ON "vocabulary_progress"("user_id", "last_reviewed_at");

ALTER TABLE "course_lesson_progress"
ADD CONSTRAINT "course_lesson_progress_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vocabulary_progress"
ADD CONSTRAINT "vocabulary_progress_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vocabulary_progress"
ADD CONSTRAINT "vocabulary_progress_vocabulary_id_fkey"
FOREIGN KEY ("vocabulary_id") REFERENCES "master_vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
