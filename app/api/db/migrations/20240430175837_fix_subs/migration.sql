-- AlterEnum
ALTER TYPE "SubscriptionStatus" ADD VALUE 'FREE_TRIAL';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "data" DROP NOT NULL;
