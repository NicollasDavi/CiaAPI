/*
  Warnings:

  - You are about to drop the column `contra_T` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `integral` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `valor_E` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `valor_M` on the `Curso` table. All the data in the column will be lost.
  - The primary key for the `Pagina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nome` on the `Pagina` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TipoDocumento" DROP CONSTRAINT "TipoDocumento_paginaId_fkey";

-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "contra_T",
DROP COLUMN "integral",
DROP COLUMN "valor_E",
DROP COLUMN "valor_M";

-- AlterTable
ALTER TABLE "Pagina" DROP CONSTRAINT "Pagina_pkey",
DROP COLUMN "nome",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pagina_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pagina_id_seq";

-- AlterTable
ALTER TABLE "TipoDocumento" ALTER COLUMN "paginaId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "CursoValor" (
    "id" TEXT NOT NULL,
    "valor_E" DOUBLE PRECISION NOT NULL,
    "valor_M" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "CursoValor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TipoDocumento" ADD CONSTRAINT "TipoDocumento_paginaId_fkey" FOREIGN KEY ("paginaId") REFERENCES "Pagina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
