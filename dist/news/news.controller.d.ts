import { NewsService } from './news.service';
import { News } from '@prisma/client';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getNews(page?: number, limit?: number): Promise<{
        data: News[];
        total: number;
        page: number;
        limit: number;
    }>;
}
