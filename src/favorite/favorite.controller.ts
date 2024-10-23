import { Controller, Post, Delete, Get, Param, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Favorite } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteDto } from './dto/favorite.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':newsId')
  @ApiOperation({ summary: 'Create a Favorites' })
  @ApiResponse({ status: 201, description: 'Favorite created', type: FavoriteDto })
  async createFavorite(@Param('newsId') newsId: number, @Req() req: Request): Promise<Favorite> {
    
    const userId = req.user['userId'];
    
    return this.favoriteService.createFavorite(userId, +newsId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':newsId')
  @ApiOperation({ summary: 'Remove a Favorite' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Favorite deleted successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Favorite not found.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to delete favorite.' })
  async removeFavorite(@Param('newsId') newsId: number, @Req() req: Request): Promise<any> {
    const userId = req.user['userId'];
    await this.favoriteService.removeFavorite(userId, newsId);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, description: 'List of user favorites', type: [FavoriteDto] })
  async getUserFavorites(@Req() req: Request): Promise<Favorite[]> {
    const userId = req.user['userId'];
    return this.favoriteService.getUserFavorites(userId);
  }
}
