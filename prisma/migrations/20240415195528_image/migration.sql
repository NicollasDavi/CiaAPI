/*
  Warnings:

  - Added the required column `imagem` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "imagem" BYTEA NOT NULL;
