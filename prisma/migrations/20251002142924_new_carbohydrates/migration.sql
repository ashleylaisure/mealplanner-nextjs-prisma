/*
  Warnings:

  - You are about to drop the column `carbohydrate` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Food" DROP COLUMN "carbohydrate",
ADD COLUMN     "carbohydrates" DOUBLE PRECISION;
