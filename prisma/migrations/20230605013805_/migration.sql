/*
  Warnings:

  - Added the required column `img_client_src` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" ADD COLUMN     "img_client_src" TEXT NOT NULL;
