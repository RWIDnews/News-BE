/*
  Warnings:

  - A unique constraint covering the columns `[userId,newsId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,newsId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_newsId_key" ON "Favorite"("userId", "newsId");

-- CreateIndex
CREATE UNIQUE INDEX "History_userId_newsId_key" ON "History"("userId", "newsId");
