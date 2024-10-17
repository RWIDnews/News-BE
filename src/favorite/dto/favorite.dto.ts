import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ description: 'ID of the news article' })
  @IsNotEmpty()
  @IsInt()
  newsId: number;
}

export class FavoriteDto {
  @ApiProperty({ description: 'Unique identifier for the Favorite' })
  id: number;

  @ApiProperty({ description: 'User ID who created the Favorite' })
  userId: number;

  @ApiProperty({ description: 'News ID that is Favorited' })
  newsId: number;

  @ApiProperty({ description: 'Date and time when the Favorite was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the Favorite was last updated' })
  updatedAt: Date;
}
