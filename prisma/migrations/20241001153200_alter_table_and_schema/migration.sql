/*
  Warnings:

  - You are about to drop the `Resposta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_formularioId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_questaoId_fkey";

-- AlterTable
ALTER TABLE "Opcao" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Resposta";

-- CreateTable
CREATE TABLE "FormularioResposta" (
    "id" SERIAL NOT NULL,
    "formularioId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "respostas" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormularioResposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormularioResposta_formularioId_userId_key" ON "FormularioResposta"("formularioId", "userId");

-- AddForeignKey
ALTER TABLE "FormularioResposta" ADD CONSTRAINT "FormularioResposta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
