import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({ description: 'ID of the news article' })
  @IsNotEmpty()
  @IsInt()
  newsId: number;
}

export class HistoryDto {
  @ApiProperty({ description: 'Unique identifier for the history' })
  id: number;

  @ApiProperty({ description: 'User ID who created the history' })
  userId: number;

  @ApiProperty({ description: 'News ID that is historyed' })
  newsId: number;

  @ApiProperty({ description: 'Date and time when the history was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the history was last updated' })
  updatedAt: Date;
}
