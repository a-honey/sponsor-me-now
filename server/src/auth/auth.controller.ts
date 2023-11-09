import { Body, Controller, HttpException, Request, Post, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SubmitUserDto } from "./dto/submit-user.dto";
import { LocalAuthGuard } from "./localAuth.guard";
import { Response } from "express";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private isValidPassword(submitUserDto: SubmitUserDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }
  @Post()
  @ApiBody({ type: SubmitUserDto })
  async createUser(@Body() submitUserDto: SubmitUserDto): Promise<AuthDto> {
    if (!this.isValidPassword(submitUserDto)) {
      throw new HttpException("Passwords do not match", 400);
    }
    const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }
}
