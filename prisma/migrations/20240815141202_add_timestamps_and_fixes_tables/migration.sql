/*
  Warnings:

  - You are about to alter the column `creditos` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `preco` on the `UsuarioCompra` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `updated_at` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3) DEFAULT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN    "deleted_at" TIMESTAMP(3) DEFAULT NULL,
ADD COLUMN    "senha" TEXT NOT NULL DEFAULT 'temporary_password',
ADD COLUMN    "updated_at" TIMESTAMP(3) NOT NULL ,
ALTER COLUMN  "creditos" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "UsuarioCompra" ADD COLUMN  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);



