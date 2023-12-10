import {
  Body,
  Controller,
  HttpException,
  Request,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SubmitUserDataDto } from "./dto/submitUserData.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TryLoginDto } from "./dto/tryLogin.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { ResponseCreateUserDto } from "./dto/responseCreateUser.dto";
import { LoggingInterceptor } from "../../interceptors/logging.interceptor";

@ApiTags("Auth")
@Controller("api/auth")
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: "회원가입",
  })
  @ApiBody({ type: SubmitUserDataDto })
  @ApiResponse({ status: 201, type: ResponseCreateUserDto })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() submitUserDto: SubmitUserDataDto): Promise<AuthDto> {
    if (!this.authService.isValidPassword(submitUserDto)) {
      throw new HttpException("Passwords do not match", 400);
    }
    const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
    return await this.authService.createUser(createUserDto);
  }

  @Post("login")
  @ApiOperation({
    summary: "로그인",
    description: "성공시 JWT 발급",
  })
  @ApiBody({ type: TryLoginDto })
  @ApiResponse({ status: 201, type: LoginUserDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("local"))
  async login(@Request() req: RequestWithUser): Promise<LoginUserDto> {
    return await this.authService.login(req.user);
  }
}
