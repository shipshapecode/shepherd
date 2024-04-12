/*
  Warnings:

  - The `attachTo` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `advanceOn` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `buttons` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cancelIcon` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `floatingUIOptions` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `when` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `publicKey` on the `UserCredential` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "defaultStepOptions" JSONB,
ADD COLUMN     "uniqueId" TEXT;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "attachTo",
ADD COLUMN     "attachTo" JSONB,
DROP COLUMN "advanceOn",
ADD COLUMN     "advanceOn" JSONB,
DROP COLUMN "buttons",
ADD COLUMN     "buttons" JSONB,
DROP COLUMN "cancelIcon",
ADD COLUMN     "cancelIcon" JSONB,
DROP COLUMN "floatingUIOptions",
ADD COLUMN     "floatingUIOptions" JSONB,
DROP COLUMN "when",
ADD COLUMN     "when" JSONB;

-- AlterTable
ALTER TABLE "UserCredential" DROP COLUMN "publicKey",
ADD COLUMN     "publicKey" JSONB NOT NULL;
