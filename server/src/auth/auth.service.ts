import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { CreatedUserDto } from "./dto/createdUser.dto";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { PrismaService } from "../../prisma/prisma.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreatedUserDto): Promise<AuthDto> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const createUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return plainToInstance(AuthDto, createUser);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any, @Res() res: Response) {
    const payload = { username: user.username, id: user.id, isSponsor: user.isSponsor };
    const access_token: string = this.jwtService.sign(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
    });

    return res.status(HttpStatus.OK).json({
      name: user.username,
      email: user.email,
      nickname: user.nickname,
      isSponsor: user.isSponsor,
      token: access_token,
    });
    //todo 토큰은 개발용. 나중에 지워!
  }
}
