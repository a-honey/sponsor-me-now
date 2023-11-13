import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Optional,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { CreateCommentDto } from "./dto/createComment.dto";
import { CommentDto } from "./dto/comment.dto";
import { OptionalIntPipe } from "../../pipes/optionalIntPipe";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiBody({ description: "댓글 작성 또는 대댓글 작성", type: CreateCommentDto })
  @ApiResponse({ status: 201, type: CommentDto })
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  async createComment(
    @Request() req: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
    @Query("postId", ParseIntPipe) postId: number,
    @Optional() @Query("parentId", OptionalIntPipe) parentId?: number,
  ) {
    const userId: number = Number(req.user.id);
    return await this.commentService.createComment(userId, postId, parentId, createCommentDto);
  }
}
