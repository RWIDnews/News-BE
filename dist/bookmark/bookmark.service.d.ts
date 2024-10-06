import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class BookmarkService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBookmark(userId: number, newsId: number): Promise<Bookmark>;
    removeBookmark(userId: number, newsId: number): Promise<void>;
    getUserBookmarks(userId: number): Promise<Bookmark[]>;
}
