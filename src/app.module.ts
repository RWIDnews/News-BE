import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteService } from './favorite/favorite.service';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [AuthModule, HistoryModule, NewsModule, FavoriteModule],
  controllers: [HistoryController, NewsController, FavoriteController],
  providers: [AppService, PrismaService, HistoryService, NewsService, FavoriteService],
  exports: [PrismaService]
})
export class AppModule {}
