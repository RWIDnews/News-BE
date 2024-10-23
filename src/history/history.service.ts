import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
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

  async removeHistory(userId: number, newsId: number): Promise<any> {
    try {
      const history = await this.prisma.history.findFirst({
        where: { userId, newsId },
      });

      if (!history) {
        throw new NotFoundException('history not found');
      }

      await this.prisma.history.deleteMany({
        where: {
          userId,
          newsId: +newsId,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'hHistory deleted successfully',
        data: history,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Failed to delete history', HttpStatus.INTERNAL_SERVER_ERROR);
    }

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
