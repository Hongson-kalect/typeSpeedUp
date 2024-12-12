-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "languageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
