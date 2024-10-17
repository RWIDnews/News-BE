import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { PrismaService } from '../prisma.service'; // Pastikan Anda sudah mengatur PrismaService

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService],
})
export class FavoriteModule {}
