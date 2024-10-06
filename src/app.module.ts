import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkModule } from './bookmark/bookmark.module';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';

@Module({
  imports: [AuthModule, BookmarkModule, NewsModule],
  controllers: [AppController, BookmarkController, NewsController],
  providers: [AppService, PrismaService, BookmarkService, NewsService],
  exports: [PrismaService]
})
export class AppModule {}
