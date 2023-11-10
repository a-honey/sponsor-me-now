import { Injectable, Res } from "@nestjs/common";
import { CreatedUserDto } from "./dto/createdUser.dto";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/loginUser.dto";
import { ValidateUserDto } from "./dto/validateUser.dto";

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
    const user: ValidateUserDto = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validatePayload(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any, @Res({ passthrough: true }) res: Response): Promise<LoginUserDto> {
    const { username, id, isSponsor, email, nickname } = user;
    const payload = { username, id, isSponsor, email, nickname };
    const access_token: string = this.jwtService.sign(payload);

    res.cookie("access_token", access_token, { httpOnly: true });
    const loginUser: LoginUserDto = {
      username: username,
      email: email,
      nickname: nickname,
      isSponsor: isSponsor,
      token: access_token,
    };
    res.json(plainToInstance(LoginUserDto, loginUser));
    return;
  }
}
