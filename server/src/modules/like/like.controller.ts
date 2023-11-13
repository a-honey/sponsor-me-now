import { Controller, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { LikeDto } from "./dto/like.dto";

@ApiTags("Like")
@Controller("like")
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    description: "좋아요. 토글방식",
  })
  @ApiResponse({ status: 201, type: LikeDto })
  async toggleLike(
    @Request() req: RequestWithUser,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<LikeDto> {
    const userId: number = Number(req.user.id);
    return await this.likeService.toggleLike(userId, postId);
  }
}
