-- CreateTable
CREATE TABLE "Training" (
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "qill" TEXT,
    "content" TEXT,
    "parentId" INTEGER,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
