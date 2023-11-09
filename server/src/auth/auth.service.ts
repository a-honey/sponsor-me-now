import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<AuthDto> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id, isSponsor: user.isSponsor };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
