import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, ParseIntPipe, Post, Query, Request, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiBody({ description: "댓글 작성 또는 대댓글 작성", type: CreateCommentDto })
  @ApiResponse({ status: 201, type: CommentDto })
  @UseGuards(AuthGuard("jwt"))
  async createComment(
    @Request() req: RequestWithUser,
    @Query("postId", ParseIntPipe) postId: number,
    @Query("parentId", ParseIntPipe) parentId: number,
  ) {}
}
