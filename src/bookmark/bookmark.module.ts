// src/bookmark/bookmark.module.ts
import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { PrismaService } from '../prisma.service'; // Pastikan Anda sudah mengatur PrismaService

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, PrismaService],
})
export class BookmarkModule {}
