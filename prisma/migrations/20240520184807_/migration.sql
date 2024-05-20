/*
  Warnings:

  - The primary key for the `Professores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nome` on the `Professores` table. All the data in the column will be lost.
  - The primary key for the `Unidades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `Unidades` table. All the data in the column will be lost.
  - The required column `id` was added to the `Professores` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Unidades` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CursoUnidade" DROP CONSTRAINT "CursoUnidade_unidadeId_fkey";

-- AlterTable
ALTER TABLE "Professores" DROP CONSTRAINT "Professores_pkey",
DROP COLUMN "nome",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Professores_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Unidades" DROP CONSTRAINT "Unidades_pkey",
DROP COLUMN "codigo",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Unidades_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CursoUnidade" ADD CONSTRAINT "CursoUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
