-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_couponsId_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "couponsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_couponsId_fkey" FOREIGN KEY ("couponsId") REFERENCES "Coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
