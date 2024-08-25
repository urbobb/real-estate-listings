/*
  Warnings:

  - Added the required column `balcony` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingFloors` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elevator` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floors` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `furnished` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garage` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heating` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "balcony" BOOLEAN NOT NULL,
ADD COLUMN     "buildingFloors" INTEGER NOT NULL,
ADD COLUMN     "elevator" BOOLEAN NOT NULL,
ADD COLUMN     "floors" INTEGER NOT NULL,
ADD COLUMN     "furnished" TEXT NOT NULL,
ADD COLUMN     "garage" INTEGER NOT NULL,
ADD COLUMN     "heating" TEXT NOT NULL;
