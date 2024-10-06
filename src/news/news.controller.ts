import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { News } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
//   @ApiResponse({ status: 200, description: 'List of news', type: [News] })
  async getNews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: News[]; total: number; page: number; limit: number }> {
    return this.newsService.getNews({ page, limit });
  }
}
