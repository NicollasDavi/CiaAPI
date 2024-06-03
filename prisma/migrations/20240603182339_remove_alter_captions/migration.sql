/*
  Warnings:

  - You are about to drop the column `alt` on the `carousel_items` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `carousel_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carousel_items" DROP COLUMN "alt",
DROP COLUMN "caption";
