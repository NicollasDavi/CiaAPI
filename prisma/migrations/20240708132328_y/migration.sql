/*
  Warnings:

  - Added the required column `userId` to the `bugs_or_features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bugs_or_features" ADD COLUMN     "userId" TEXT NOT NULL;
