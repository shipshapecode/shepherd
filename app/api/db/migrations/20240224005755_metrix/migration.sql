/*
  Warnings:

  - You are about to drop the column `journeyId` on the `Actor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Actor" DROP CONSTRAINT "Actor_journeyId_fkey";

-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "journeyId";

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "journeyId" TEXT;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
