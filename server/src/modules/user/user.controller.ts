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
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserDto } from "./dto/getUser.dto";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDataDto } from "./dto/updateUserData.dto";
import { RequestWithUser } from "./interface/requestWithUser";
import { GetUserListDto } from "./dto/getUserList.dto";
import { ResponseUserListDto } from "./dto/responseUserList.dto";
import { ResponseUpdatedUserDto } from "./dto/responseUpdatedUser.dto";
import { UpdatedUserDto } from "./dto/updatedUser.dto";
import { ParseIntWithDefaultUserPipe } from "../../pipes/parseIntWithDefaultUserPipe";
import { ParseIntWithDefaultPipe } from "../../pipes/parseIntWithDefaultPipe";
import { ResponseUserDto } from "./dto/responseUser.dto";
import { ValidateUserDto } from "../auth/dto/validateUser.dto";

@ApiTags("User")
@Controller("api/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/internal/:email")
  @ApiOperation({
    summary: "[서버용] 서버 인증, 인가 로직에 사용",
  })
  @ApiBody({
    type: GetUserDto,
  })
  @ApiResponse({ status: 200, type: UserDto })
  async getUserByEmail(@Param("email") email: string): Promise<ValidateUserDto> {
    return await this.userService.getUserByEmail(email);
  }

  @Put()
  @ApiOperation({
    summary: "회원 정보 수정",
    description: "요청 받은 필드 수정",
  })
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({ type: UpdateUserDataDto })
  @ApiResponse({ status: 200, type: ResponseUpdatedUserDto })
  async editUser(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDataDto,
  ): Promise<UpdatedUserDto> {
    const userId: number = Number(req.user.id);
    return await this.userService.editUser(userId, updateUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "단일 유저 상세 조회",
    description: "userId를 쿼리로 받을 시 해당 유저 조회, 없을 시 로그인한 사용자 조회",
  })
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({ description: "유저 상세정보 조회. 쿼리 값이 있을 시 해당 유저 조회" })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  async getUser(
    @Request() req: RequestWithUser,
    @Query("userId", new ParseIntWithDefaultUserPipe()) userId: number,
  ): Promise<UserDto> {
    const reqUserId: number = Number(req.user.id);
    if (userId !== 0) {
      return await this.userService.findUserById(userId);
    }
    return await this.userService.findUserById(reqUserId);
  }

  @Get("/list")
  @ApiOperation({
    summary: "유저 리스트",
    description:
      `쿼리별 유저리스트. 서버사이드 페이지네이션<br />` +
      `all:전체<br />` +
      `random:후원중이지 않은 랜덤 7명<br />` +
      `allSponsored : 후원 대상자 전체<br />` +
      `sponsor:내가 후원중인 유저<br />` +
      `sponsored:날 후원하는 유저<br />`,
  })
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, type: ResponseUserListDto })
  async getUsers(
    @Request() req: RequestWithUser,
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
    @Query("search") search: string,
  ): Promise<ResponseUserListDto> {
    const userId: number = Number(req.user.id);
    let result;

    switch (search) {
      case "all":
        result = await this.userService.getUsers(page, limit);
        break;
      case "random":
        result = await this.userService.getRandomUsers(userId);
        break;
      case "allSponsored":
        result = await this.userService.getSponsoredUsers(page, limit);
        break;
      case "sponsor":
        result = await this.userService.getMySponsorUsers(page, limit, userId);
        break;
      case "sponsored":
        result = await this.userService.getMySponsoredUsers(page, limit, userId);
        break;
      default:
        throw new BadRequestException(`잘못된 검색 매개변수: ${search}`);
    }

    return result;
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    summary: "회원탈퇴",
    description: "프로필,백그라운드 이미지 + 관련 게시글, 댓글 삭제",
  })
  @ApiBody({ description: "유저 + 관련 레코드 삭제" })
  @ApiResponse({ status: 204, type: ResponseUserDto })
  async deleteUser(@Request() req: RequestWithUser): Promise<UserDto> {
    const userId: number = Number(req.user.id);
    return await this.userService.deleteUser(userId);
  }
}
