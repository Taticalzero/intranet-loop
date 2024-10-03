/*
  Warnings:

  - A unique constraint covering the columns `[formularioId,userId]` on the table `Resposta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formularioId` to the `Resposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Resposta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opcao" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Resposta" ADD COLUMN     "formularioId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Resposta_formularioId_userId_key" ON "Resposta"("formularioId", "userId");

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
