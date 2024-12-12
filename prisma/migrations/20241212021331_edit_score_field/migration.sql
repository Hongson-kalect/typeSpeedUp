/*
  Warnings:

  - You are about to drop the column `rank` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "rank",
ALTER COLUMN "targetId" DROP NOT NULL;
