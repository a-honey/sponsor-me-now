import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Request,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SubmitUserDto } from "./dto/submit-user.dto";
import { LocalAuthGuard } from "./localAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private isValidPassword(submitUserDto: SubmitUserDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }

  @Post()
  async createUser(@Body() submitUserDto: SubmitUserDto): Promise<AuthDto> {
    if (!this.isValidPassword(submitUserDto)) {
      throw new HttpException("Passwords do not match", 400);
    }
    const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
    return await this.authService.createUser(createUserDto);
  }
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
