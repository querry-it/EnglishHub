-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gems" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_check_in" TIMESTAMPTZ(6);
