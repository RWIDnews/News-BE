import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { NewsDto, PaginatedNewsDto } from './dto/news.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number, example: 10 })
  @ApiQuery({ name: 'category', required: false, description: 'Category of news', type: String, example: 'Technology' })
  @ApiOperation({ summary: 'Get list of news' })
  @ApiResponse({ status: 200, description: 'List of news', type: PaginatedNewsDto })
  async getNews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
  ): Promise<{ data: NewsDto[]; total: number; page: number; limit: number }> {
    return this.newsService.getNews({ page, limit, category });
  }

  @Get(':newsId')
  @ApiParam({ name: 'newsId', description: 'ID of the news', type: Number, example: 1 })
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiResponse({ status: 200, description: 'News details', type: NewsDto })
  @ApiResponse({ status: 404, description: 'News not found' })
  async getNewsById(@Param('newsId') newsId: number): Promise<NewsDto> {
    return this.newsService.getNewsById(+newsId);
  }
}
