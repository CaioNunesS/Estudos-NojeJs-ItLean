-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "verificationCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_verificationCode_key" ON "users"("verificationCode");

-- CreateIndex
CREATE INDEX "users_email_verificationCode_idx" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verificationCode_key" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE INDEX "authors_name_idx" ON "authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_key" ON "authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");

-- CreateIndex
CREATE INDEX "quotes_quote_idx" ON "quotes"("quote");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
