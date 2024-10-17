import { Injectable } from '@nestjs/common';
import { History } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createHistory(userId: number, newsId: number): Promise<History> {
    return this.prisma.history.upsert({
      where: {
        userId_newsId: {
          userId,
          newsId,
        },
      },
      update: {},
      create: {
        userId,
        newsId,
      },
    });
  }

  async removeHistory(userId: number, newsId: number): Promise<void> {
    await this.prisma.history.deleteMany({
      where: {
        userId,
        newsId,
      },
    });
  }

  async getUserHistories(userId: number): Promise<History[]> {
    return this.prisma.history.findMany({
      where: { userId },
      include: { 
        news: {
          select: {
            id: true,
            title: true,
            shortDesc: true,
            category: true,
            imageUrl: true,
            publishedAt: true,
            createdAt: true,
            updatedAt: true,
            publisherId: true,
          },
        } 
      },
    });
  }
}
