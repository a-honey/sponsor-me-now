import { Body, Controller, HttpException, Request, Post, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SubmitUserDataDto } from "./dto/submitUserData.dto";
import { LocalAuthGuard } from "./localAuth.guard";
import { Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatedUserDto } from "./dto/createdUser.dto";
import { TryLoginDto } from "./dto/tryLogin.dto";
import { LoginUserDto } from "./dto/loginUser.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private isValidPassword(submitUserDto: SubmitUserDataDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }
  @Post()
  @ApiBody({ description: "회원가입", type: SubmitUserDataDto })
  @ApiResponse({ status: 200, type: CreatedUserDto })
  async createUser(@Body() submitUserDto: SubmitUserDataDto): Promise<AuthDto> {
    if (!this.isValidPassword(submitUserDto)) {
      throw new HttpException("Passwords do not match", 400);
    }
    const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ description: "로그인", type: TryLoginDto })
  @ApiResponse({ type: LoginUserDto })
  async login(@Request() req, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }
}
