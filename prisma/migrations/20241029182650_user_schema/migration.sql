/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google', 'Credentials');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "provider" "Provider" NOT NULL;
