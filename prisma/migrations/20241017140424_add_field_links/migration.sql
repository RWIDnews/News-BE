/*
  Warnings:

  - A unique constraint covering the columns `[links]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "links" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "News_links_key" ON "News"("links");
