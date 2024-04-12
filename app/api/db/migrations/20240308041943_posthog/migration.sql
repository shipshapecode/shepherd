-- AlterTable
ALTER TABLE "Integration" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "projectId" TEXT;
