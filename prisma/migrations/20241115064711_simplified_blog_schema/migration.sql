/*
  Warnings:

  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `readTime` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "category",
DROP COLUMN "readTime",
ALTER COLUMN "published" SET DEFAULT true;
