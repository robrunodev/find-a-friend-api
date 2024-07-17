/*
  Warnings:

  - Added the required column `description` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "description" TEXT NOT NULL;
