/*
  Warnings:

  - The `rating` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "rating",
ADD COLUMN     "rating" TEXT;

-- DropEnum
DROP TYPE "Rating";
