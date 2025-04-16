-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isStarted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startedDate" TIMESTAMP(3);
