import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Body,
  SerializeOptions,
  Query,
  DefaultValuePipe,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { GetUserDto } from "./dto/getUser.dto";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { RequestWithUser } from "./interface/requestWithUser";
import { ParseIntWithDefaultPipe } from "../../utils/parseIntWithDefaultPipe";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/internal/:email")
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

  @UseGuards(AuthGuard("jwt"))
  @Get()
  @ApiBody({ description: "사용자 정보 불러오기. 쿼리 값이 있을 시 해당 유저 조회" })
  @ApiResponse({ status: 200, type: UserDto })
  async getUser(
    @Request() req: RequestWithUser,
    @Query("userId") userId: string,
  ): Promise<UserDto> {
    const reqUserId: number = Number(req.user.id);
    const queryUserId: number = Number(userId);
    if (queryUserId !== 0) {
      return await this.userService.findUserById(queryUserId);
    }
    return await this.userService.findUserById(reqUserId);
  }

  @Get("/list")
  @ApiBody({ description: "유저리스트. 서버사이드 페이지네이션" })
  @ApiResponse({ status: 200, type: UserDto })
  async getUsers(
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
  ): Promise<UserDto[]> {
    return await this.userService.getUsers(page, limit);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete()
  @ApiBody({ description: "유저 + 관련 레코드 삭제" })
  @ApiResponse({ status: 204, type: UserDto })
  @SerializeOptions({ strategy: "exposeAll" })
  async deleteUser(@Request() req: RequestWithUser): Promise<UserDto> {
    const userId: number = Number(req.user.id);
    return await this.userService.deleteUser(userId);
  }
}
