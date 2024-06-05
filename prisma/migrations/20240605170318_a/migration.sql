/*
  Warnings:

  - You are about to drop the column `setoresId` on the `Pagina` table. All the data in the column will be lost.
  - The primary key for the `Setores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Setores` table. All the data in the column will be lost.
  - You are about to drop the `SetorUnidade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codigo` to the `Setores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pagina" DROP CONSTRAINT "Pagina_setoresId_fkey";

-- DropForeignKey
ALTER TABLE "SetorUnidade" DROP CONSTRAINT "SetorUnidade_setorId_fkey";

-- DropForeignKey
ALTER TABLE "SetorUnidade" DROP CONSTRAINT "SetorUnidade_unidadeId_fkey";

-- AlterTable
ALTER TABLE "Pagina" DROP COLUMN "setoresId";

-- AlterTable
ALTER TABLE "Setores" DROP CONSTRAINT "Setores_pkey",
DROP COLUMN "id",
ADD COLUMN     "codigo" INTEGER NOT NULL,
ADD CONSTRAINT "Setores_pkey" PRIMARY KEY ("codigo");

-- DropTable
DROP TABLE "SetorUnidade";
