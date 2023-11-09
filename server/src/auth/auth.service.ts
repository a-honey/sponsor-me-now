import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  private jwtService: JwtService;
  async createUser(createUserDto: CreateUserDto): Promise<AuthDto> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }
}
