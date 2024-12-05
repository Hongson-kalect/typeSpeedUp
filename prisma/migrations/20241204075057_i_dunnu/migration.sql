-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_paragraphId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_trainingId_fkey";

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "paragraphId" DROP NOT NULL,
ALTER COLUMN "trainingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
