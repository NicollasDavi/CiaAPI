/*
  Warnings:

  - Added the required column `At` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "At" TIMESTAMP(3) NOT NULL;
