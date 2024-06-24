/*
  Warnings:

  - Added the required column `arqId` to the `TipoDocumento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TipoDocumento" ADD COLUMN     "arqId" TEXT NOT NULL;
