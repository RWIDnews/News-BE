import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';


export class NewsDto {
  @ApiProperty({ description: 'Unique identifier for the news' })
  id: number;

  @ApiProperty({ description: 'Title of the news article' })
  title: string;

  @ApiProperty({ description: 'Short description of the news article' })
  shortDesc: string;

  @ApiProperty({ description: 'Full description of the news article' })
  description?: string;

  @ApiProperty({ description: 'Category of the news article' })
  category: string;

  @ApiProperty({ description: 'Image URL associated with the news article' })
  imageUrl: string;

  @ApiProperty({ description: 'Date and time when the news was published' })
  publishedAt: string;

  @ApiProperty({ description: 'Unique identifier of the publisher' })
  publisherId: number;

  @ApiProperty({ description: 'Date and time when the news was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the news was last updated' })
  updatedAt: Date;
}

export class PaginatedNewsDto {
  @IsOptional()
  @ApiProperty({ type: [NewsDto], description: 'List of news articles' })
  data?: NewsDto[];

  @IsOptional()
  @ApiProperty({ description: 'Total number of news articles' })
  total?: number;

  @IsOptional()
  @ApiProperty({ description: 'Current page number' })
  page?: number;

  @IsOptional()
  @ApiProperty({ description: 'Number of news articles per page' })
  limit?: number;
}
