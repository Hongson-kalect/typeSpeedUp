/*
  Warnings:

  - You are about to alter the column `expires_at` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the column `access_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_id_key";

-- DropIndex
DROP INDEX "User_type_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "session_state" TEXT,
ALTER COLUMN "access_token" DROP NOT NULL,
ALTER COLUMN "expires_at" DROP NOT NULL,
ALTER COLUMN "expires_at" SET DATA TYPE INTEGER,
ALTER COLUMN "token_type" DROP NOT NULL,
ALTER COLUMN "scope" DROP NOT NULL,
ALTER COLUMN "id_token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "provider",
DROP COLUMN "scope",
DROP COLUMN "type",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
