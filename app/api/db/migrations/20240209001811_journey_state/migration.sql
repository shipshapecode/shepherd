-- CreateEnum
CREATE TYPE "JourneyState" AS ENUM ('ACTIVE', 'CANCEL', 'COMPLETE', 'SHOW');

-- DropForeignKey
ALTER TABLE "Actor" DROP CONSTRAINT "Actor_journeyId_fkey";

-- AlterTable
ALTER TABLE "Actor" ALTER COLUMN "journeyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "actorId" INTEGER,
ADD COLUMN     "journeyState" "JourneyState" NOT NULL DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
