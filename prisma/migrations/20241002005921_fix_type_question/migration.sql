/*
  Warnings:

  - Changed the type of `tipo` on the `Questao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestaoTipo" AS ENUM ('short', 'paragraph', 'multiple');

-- AlterTable
ALTER TABLE "Questao" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "QuestaoTipo" NOT NULL;
