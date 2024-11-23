/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `access_token` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires_at` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token_type` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scope` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_token` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `scope` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refresh_token",
DROP COLUMN "session_state",
DROP COLUMN "userId",
ALTER COLUMN "access_token" SET NOT NULL,
ALTER COLUMN "expires_at" SET NOT NULL,
ALTER COLUMN "expires_at" SET DATA TYPE BIGINT,
ALTER COLUMN "token_type" SET NOT NULL,
ALTER COLUMN "scope" SET NOT NULL,
ALTER COLUMN "id_token" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" TEXT,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "scope" TEXT NOT NULL,
ADD COLUMN     "type" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_type_key" ON "User"("type");
