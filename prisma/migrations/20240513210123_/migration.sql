/*
  Warnings:

  - Added the required column `nome` to the `Pagina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagina" ADD COLUMN     "nome" TEXT NOT NULL;
