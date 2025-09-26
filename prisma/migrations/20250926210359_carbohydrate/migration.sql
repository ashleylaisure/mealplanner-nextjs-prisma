/*
  Warnings:

  - You are about to drop the column `carbohydrates` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Food" DROP COLUMN "carbohydrates",
ADD COLUMN     "carbohydrate" DOUBLE PRECISION;
