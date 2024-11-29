/*
  Warnings:

  - The `qill` column on the `Training` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "qill",
ADD COLUMN     "qill" JSONB;
