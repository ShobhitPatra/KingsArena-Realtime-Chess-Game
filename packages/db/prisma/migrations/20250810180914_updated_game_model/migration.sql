/*
  Warnings:

  - Added the required column `gameState` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."GAME_STATE" AS ENUM ('ONGOING', 'OVER');

-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "gameState" "public"."GAME_STATE" NOT NULL,
ALTER COLUMN "gameResult" DROP NOT NULL;
