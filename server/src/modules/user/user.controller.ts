import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Body,
  SerializeOptions,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { GetUserDto } from "./dto/getUser.dto";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { RequestWithUser } from "./interface/requestWithUser";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":email")
  @ApiBody({
    description: "이메일로 유저 조회, 서비스 로직 내 인증/인가에서 사용하기에 비밀번호 노출",
    type: GetUserDto,
  })
  @ApiResponse({ status: 200, type: UserDto })
  async getUserByEmail(@Param("email") email: string): Promise<UserDto> {
    return await this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put()
  @ApiBody({ description: "회원 정보 업데이트", type: UpdateUserDto })
  @ApiResponse({ status: 200, type: UserDto })
  @SerializeOptions({ strategy: "exposeAll" })
  async editUser(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const userId: number = Number(req.user.id);
    return await this.userService.editUser(userId, updateUserDto);
  }
}
