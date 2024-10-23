import { Controller, Post, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { History } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { HistoryDto } from './dto/history.dto';

@ApiTags('histories')
@Controller('histories')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':newsId')
  @ApiOperation({ summary: 'Create a historie' })
  @ApiResponse({ status: 201, description: 'History created', type: HistoryDto })
  async createHistory(@Param('newsId') newsId: number, @Req() req: Request): Promise<History> {
    
    const userId = req.user['userId'];
    return this.historyService.createHistory(userId, +newsId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':newsId')
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({ status: 200, description: 'history removed' })
  async removeHistory(@Param('newsId') newsId: number, @Req() req: Request): Promise<any> {
    const userId = req.user['userId'];
    await this.historyService.removeHistory(userId, +newsId);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get user histories' })
  @ApiResponse({ status: 200, description: 'List of user histories', type: [HistoryDto] })
  async getUserHistorie(@Req() req: Request): Promise<History[]> {
    const userId = req.user['userId'];
    return this.historyService.getUserHistories(userId);
  }
}
