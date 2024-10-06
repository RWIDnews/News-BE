import { Injectable } from '@nestjs/common';
import { News } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNews({ page, limit }: { page: number; limit: number }): Promise<{ data: News[]; total: number; page: number; limit: number }> {
    const total = await this.prisma.news.count();
    
    const news = await this.prisma.news.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        publishedAt: 'desc', // Sort by published date
      },
    });

    return {
      data: news,
      total,
      page,
      limit,
    };
  }
}
