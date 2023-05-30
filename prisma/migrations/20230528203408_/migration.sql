/*
  Warnings:

  - Added the required column `img_user_src` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "img_user_src" TEXT NOT NULL;
