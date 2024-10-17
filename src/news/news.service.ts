import { Injectable } from '@nestjs/common';
import { News } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNews({ page, limit }: { page: number; limit: number }): Promise<{ data: NewsDto[]; total: number; page: number; limit: number }> {
    const total = await this.prisma.news.count();
    
    const parsedLimit = Number(limit);
    const parsedPage = Number(page);

    const news = await this.prisma.news.findMany({
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      orderBy: {
        publishedAt: 'desc',
      },
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
    });

    return {
      data: news,
      total,
      page: parsedPage,
      limit: parsedLimit,
    };
  }

  async getNewsById(newsId: number): Promise<News | null> {
    const news = await this.prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new Error('News not found 😕');
    }

    return news;
  }

}

