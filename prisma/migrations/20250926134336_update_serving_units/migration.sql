-- DropForeignKey
ALTER TABLE "public"."ServingUnit" DROP CONSTRAINT "ServingUnit_foodId_fkey";

-- AlterTable
ALTER TABLE "public"."ServingUnit" ALTER COLUMN "foodId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ServingUnit" ADD CONSTRAINT "ServingUnit_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;
