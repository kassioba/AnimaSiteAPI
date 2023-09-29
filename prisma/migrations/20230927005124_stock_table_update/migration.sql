/*
  Warnings:

  - Added the required column `quantity` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Size" ADD VALUE 'NA';

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "quantity" INTEGER NOT NULL;
