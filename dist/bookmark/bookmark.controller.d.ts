import { BookmarkService } from './bookmark.service';
import { Request } from 'express';
import { Bookmark } from '@prisma/client';
export declare class BookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: BookmarkService);
    createBookmark(newsId: number, req: Request): Promise<Bookmark>;
    removeBookmark(newsId: number, req: Request): Promise<void>;
    getUserBookmarks(req: Request): Promise<Bookmark[]>;
}
