import { IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user', example: 'securePassword123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Email address of the user', example: 'userkevin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user', example: 'rahasia123' })
  @IsNotEmpty()
  password: string;
}

export class UpdateDto {
  @ApiProperty({ description: 'Email address of the user', example: 'userkevin@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Password for the user', example: 'newSecurePassword123', required: false })
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({ description: 'Full name of the user', example: 'Jane Doe', required: false })
  @IsOptional()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({ description: 'Phone number of the user', example: '+621234567890', required: false })
  @IsOptional()
  @IsPhoneNumber('ID')
  phoneNumber?: string;
}
