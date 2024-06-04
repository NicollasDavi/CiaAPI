/*
  Warnings:

  - You are about to drop the column `alertas` on the `avisos` table. All the data in the column will be lost.
  - You are about to drop the column `conteudo` on the `avisos` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `avisos` table. All the data in the column will be lost.
  - Added the required column `text` to the `avisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `avisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `avisos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avisos" DROP COLUMN "alertas",
DROP COLUMN "conteudo",
DROP COLUMN "titulo",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
