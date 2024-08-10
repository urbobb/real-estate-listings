/*
  Warnings:

  - You are about to drop the column `listingTyle` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `listingType` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `propertyType` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "listingTyle",
ADD COLUMN     "listingType" TEXT NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
DROP COLUMN "propertyType",
ADD COLUMN     "propertyType" TEXT NOT NULL,
ALTER COLUMN "energyclass" DROP NOT NULL;
