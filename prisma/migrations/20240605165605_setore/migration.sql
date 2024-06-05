/*
  Warnings:

  - The primary key for the `Setores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `Setores` table. All the data in the column will be lost.
  - The required column `id` was added to the `Setores` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Pagina" ADD COLUMN     "setoresId" TEXT;

-- AlterTable
ALTER TABLE "Setores" DROP CONSTRAINT "Setores_pkey",
DROP COLUMN "codigo",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Setores_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SetorUnidade" (
    "setorId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SetorUnidade_pkey" PRIMARY KEY ("setorId","unidadeId")
);

-- AddForeignKey
ALTER TABLE "SetorUnidade" ADD CONSTRAINT "SetorUnidade_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetorUnidade" ADD CONSTRAINT "SetorUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagina" ADD CONSTRAINT "Pagina_setoresId_fkey" FOREIGN KEY ("setoresId") REFERENCES "Setores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
