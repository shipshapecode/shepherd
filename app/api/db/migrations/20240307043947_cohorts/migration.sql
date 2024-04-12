/*
  Warnings:

  - You are about to drop the column `providerId` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "providerId",
ADD COLUMN     "integrationId" TEXT;

-- AlterTable
ALTER TABLE "Integration" ADD COLUMN     "cohorts" JSONB,
ADD COLUMN     "syncedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
