/*
  Warnings:

  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `estoque` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN "estoque" INTEGER NOT NULL DEFAULT 10,
ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "nome" SET NOT NULL;
