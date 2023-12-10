import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { plainToInstance } from "class-transformer";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/loginUser.dto";
import { ValidateUserDto } from "./dto/validateUser.dto";
import { Repository } from "typeorm";
import { User } from "../../entitys/user";
import { InjectRepository } from "@nestjs/typeorm";
import { SubmitUserDataDto } from "./dto/submitUserData.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  isValidPassword(submitUserDto: SubmitUserDataDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthDto> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const createUser = await this.userRepository.save(createUserDto);
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

  async validatePayload(email: string): Promise<ValidateUserDto> {
    const user: ValidateUserDto = await this.userService.getUserByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<LoginUserDto> {
    const { username, id, isSponsor, email, nickname } = user;
    const payload = { username, id, isSponsor, email, nickname };
    const access_token: string = this.jwtService.sign(payload);

    const loginUser: LoginUserDto = {
      id: id,
      username: username,
      email: email,
      nickname: nickname,
      isSponsor: isSponsor,
      token: access_token,
    };

    return plainToInstance(LoginUserDto, loginUser);
  }
}
