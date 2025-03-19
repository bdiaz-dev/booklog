-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('like', 'normal', 'dislike');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "rating" "Rating";
