import { Controller, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { LikeDto } from "./dto/like.dto";

@ApiTags("Like")
@Controller("api/like")
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post(":postId")
  @ApiOperation({
    summary: "좋아요",
    description: "토글방식. 이미 좋아요가 적용된 상태에서 재요청시 좋아요 취소",
  })
  @ApiResponse({ status: 201, type: LikeDto })
  @UseGuards(AuthGuard("jwt"))
  async toggleLike(
    @Request() req: RequestWithUser,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<LikeDto> {
    const userId: number = Number(req.user.id);
    return await this.likeService.toggleLike(userId, postId);
  }
}
