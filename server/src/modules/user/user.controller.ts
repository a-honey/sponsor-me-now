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
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserDto } from "./dto/getUser.dto";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { RequestWithUser } from "./interface/requestWithUser";
import { ParseIntWithDefaultPipe } from "../../utils/parseIntWithDefaultPipe";

@ApiTags("User")
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

  @Put()
  @UseGuards(AuthGuard("jwt"))
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

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({ description: "유저 상세정보 조회. 쿼리 값이 있을 시 해당 유저 조회" })
  @ApiResponse({ status: 200, type: UserDto })
  async getUser(
    @Request() req: RequestWithUser,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<UserDto> {
    const reqUserId: number = Number(req.user.id);
    if (userId !== 0) {
      return await this.userService.findUserById(userId);
    }
    return await this.userService.findUserById(reqUserId);
  }

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    description:
      `쿼리별 유저리스트. 서버사이드 페이지네이션<br />` +
      `all:전체<br />` +
      `random:후원중이지 않은 랜덤 7명<br />` +
      `allSponsored : 후원 대상자 전체<br />` +
      `sponsor:내가 후원중인 유저<br />` +
      `sponsored:날 후원하는 유저<br />`,
  })
  @ApiResponse({ status: 200, type: UserDto })
  async getUsers(
    @Request() req: RequestWithUser,
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
    @Query("search") search: string,
  ): Promise<{ totalPage: number; currentPage: number; users: UserDto[] }> {
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
