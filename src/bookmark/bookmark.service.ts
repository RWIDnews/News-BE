// src/bookmark/bookmark.service.ts
import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async createBookmark(userId: number, newsId: number): Promise<Bookmark> {
    return this.prisma.bookmark.create({
      data: {
        userId,
        newsId,
      },
    });
  }

  async removeBookmark(userId: number, newsId: number): Promise<void> {
    await this.prisma.bookmark.deleteMany({
      where: {
        userId,
        newsId,
      },
    });
  }

  async getUserBookmarks(userId: number): Promise<Bookmark[]> {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: { news: true },
    });
  }
}
