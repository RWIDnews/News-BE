import { Injectable } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async createFavorite(userId: number, newsId: number): Promise<Favorite> {
    
    return this.prisma.favorite.upsert({
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

  async removeFavorite(userId: number, newsId: number): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: {
        userId,
        newsId,
      },
    });
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return this.prisma.favorite.findMany({
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
