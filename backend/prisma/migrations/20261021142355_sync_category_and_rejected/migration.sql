-- AlterEnum
ALTER TYPE "SubmissionStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "vocab_decks" ADD COLUMN     "category" VARCHAR(100);
