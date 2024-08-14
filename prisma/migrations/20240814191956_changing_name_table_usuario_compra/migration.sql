/*
  Warnings:

  - You are about to drop the `ItemCompra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemCompra" DROP CONSTRAINT "ItemCompra_compraId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCompra" DROP CONSTRAINT "ItemCompra_produtoId_fkey";

-- DropTable
DROP TABLE "ItemCompra";

-- CreateTable
CREATE TABLE "UsuarioCompra" (
    "id" SERIAL NOT NULL,
    "compraId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UsuarioCompra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsuarioCompra" ADD CONSTRAINT "UsuarioCompra_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCompra" ADD CONSTRAINT "UsuarioCompra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
