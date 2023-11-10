import {
  Body,
  Controller,
  HttpException,
  Request,
  Post,
  UseGuards,
  Res,
  SerializeOptions,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SubmitUserDataDto } from "./dto/submitUserData.dto";
import { Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TryLoginDto } from "./dto/tryLogin.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private isValidPassword(submitUserDto: SubmitUserDataDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }
  @Post()
  @ApiBody({ description: "회원가입", type: SubmitUserDataDto })
  @ApiResponse({ status: 201, type: AuthDto })
  @SerializeOptions({ strategy: "exposeAll" })
  async createUser(@Body() submitUserDto: SubmitUserDataDto): Promise<AuthDto> {
    if (!this.isValidPassword(submitUserDto)) {
      throw new HttpException("Passwords do not match", 400);
    }
    const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiBody({ description: "로그인", type: TryLoginDto })
  @ApiResponse({ type: LoginUserDto })
  async login(@Request() req: RequestWithUser, @Res() res: Response): Promise<LoginUserDto> {
    return await this.authService.login(req.user, res);
  }
}
