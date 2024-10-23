import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
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

  async removeFavorite(userId: number, newsId: number): Promise<any> {
    try {
      const favorite = await this.prisma.favorite.findFirst({
        where: { userId, newsId },
      });

      if (!favorite) {
        throw new NotFoundException('Favorite not found');
      }

      await this.prisma.favorite.deleteMany({
        where: {
          userId,
          newsId: +newsId,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Favorite deleted successfully',
        data: favorite,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Failed to delete favorite', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
