/*
  Warnings:

  - You are about to drop the column `gameState` on the `Game` table. All the data in the column will be lost.
  - Made the column `gameResult` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "gameState",
ALTER COLUMN "gameResult" SET NOT NULL;

-- DropEnum
DROP TYPE "public"."GAME_STATE";
