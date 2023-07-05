-- CreateTable
CREATE TABLE "UserCoupons" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "couponsId" TEXT NOT NULL,

    CONSTRAINT "UserCoupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCoupons_id_key" ON "UserCoupons"("id");

-- AddForeignKey
ALTER TABLE "UserCoupons" ADD CONSTRAINT "UserCoupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCoupons" ADD CONSTRAINT "UserCoupons_couponsId_fkey" FOREIGN KEY ("couponsId") REFERENCES "Coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
