import { News } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class NewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getNews({ page, limit }: {
        page: number;
        limit: number;
    }): Promise<{
        data: News[];
        total: number;
        page: number;
        limit: number;
    }>;
}
