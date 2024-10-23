// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '45m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Save refreshToken to the database associated with the user
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateProfile(userId: number, data: UpdateDto) {
    const updateData: { email?: string; fullName?: string; phoneNumber?: string } = {};
  
    if (data.email) {
      updateData.email = data.email;
    }
  
    if (data.fullName) {
      updateData.fullName = data.fullName;
    }
  
    if (data.phoneNumber) {
      updateData.phoneNumber = data.phoneNumber;
    }
    
    
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  
    const { password, ...result } = user;
    return result;
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const { password, ...result } = user;
    return result;
  }

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.name,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const tokenInDb = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenInDb) {
        throw new Error('Invalid refresh token');
      }

      const accessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub },
        { expiresIn: '45m' },
      );

      return { accessToken };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }
}
