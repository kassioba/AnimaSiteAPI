/*
  Warnings:

  - Added the required column `image_alt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image_alt" TEXT NOT NULL;
