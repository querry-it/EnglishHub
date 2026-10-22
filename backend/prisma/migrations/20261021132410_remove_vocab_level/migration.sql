-- CreateTable
CREATE TABLE "vocab_decks" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "thumbnail" VARCHAR(500),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocab_decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_vocabulary" (
    "id" UUID NOT NULL,
    "deck_id" UUID NOT NULL,
    "word" VARCHAR(100) NOT NULL,
    "phonetic" VARCHAR(100),
    "meaning" TEXT NOT NULL,
    "definition" TEXT,
    "example" TEXT,
    "image_url" VARCHAR(500),
    "audio_url" VARCHAR(500),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_vocabulary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "master_vocabulary" ADD CONSTRAINT "master_vocabulary_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "vocab_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
