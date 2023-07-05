/*
  Warnings:

  - You are about to drop the column `discount` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "discount" TEXT;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "discount";
