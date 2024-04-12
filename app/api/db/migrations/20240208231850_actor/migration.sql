/*
  Warnings:

  - You are about to drop the column `date` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `journeyId` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `accountId` on table `Journey` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accountId` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `value` on the `Metric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_journeyId_fkey";

-- AlterTable
ALTER TABLE "Journey" ALTER COLUMN "accountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "date",
DROP COLUMN "journeyId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "value",
ADD COLUMN     "value" JSONB NOT NULL;

-- DropTable
DROP TABLE "Person";

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journeyId" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
