// src/bookmark/bookmark.controller.ts
import { Controller, Post, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Bookmark } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':newsId')
//   @ApiResponse({ status: 201, description: 'Bookmark created', type: Bookmark })
  async createBookmark(@Param('newsId') newsId: number, @Req() req: Request): Promise<Bookmark> {
    
    const userId = req.user.id;
    return this.bookmarkService.createBookmark(userId, newsId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':newsId')
  @ApiResponse({ status: 200, description: 'Bookmark removed' })
  async removeBookmark(@Param('newsId') newsId: number, @Req() req: Request): Promise<void> {
    const userId = req.user.id;
    await this.bookmarkService.removeBookmark(userId, newsId);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
//   @ApiResponse({ status: 200, description: 'List of bookmarks', type: [Bookmark] })
  async getUserBookmarks(@Req() req: Request): Promise<Bookmark[]> {
    const userId = req.user.id;
    return this.bookmarkService.getUserBookmarks(userId);
  }
}
