/*
  Warnings:

  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `turno` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_pkey",
ADD COLUMN     "turno" TEXT NOT NULL,
ADD COLUMN     "unidade" TEXT NOT NULL,
ADD CONSTRAINT "Curso_pkey" PRIMARY KEY ("nome");
