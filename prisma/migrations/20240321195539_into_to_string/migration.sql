/*
  Warnings:

  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_pkey",
ALTER COLUMN "codigo" SET DATA TYPE TEXT,
ADD CONSTRAINT "Curso_pkey" PRIMARY KEY ("codigo");
