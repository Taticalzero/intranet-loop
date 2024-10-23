-- CreateEnum
CREATE TYPE "StatusDenuncia" AS ENUM ('pendente', 'em_analise', 'resolvida');

-- CreateTable
CREATE TABLE "Denuncia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusDenuncia" NOT NULL DEFAULT 'pendente',
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
