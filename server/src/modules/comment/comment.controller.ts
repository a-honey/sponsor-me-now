import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { CreateCommentDto } from "./dto/createComment.dto";
import { CommentDto } from "./dto/comment.dto";
import { OptionalIntPipe } from "../../pipes/optionalIntPipe";
import { ResponseCommentDto } from "./dto/responseComment.dto";
import { LoggingInterceptor } from "../../interceptors/logging.interceptor";

@ApiTags("Comment")
@Controller("api/comment")
@UseInterceptors(LoggingInterceptor)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiOperation({
    summary: "댓글 작성",
    description: "댓글 작성 또는 대댓글 작성",
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, type: ResponseCommentDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  async createComment(
    @Request() req: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
    @Query("postId", ParseIntPipe) postId: number,
    @Optional() @Query("parentId", OptionalIntPipe) parentId?: number,
  ): Promise<ResponseCommentDto> {
    const userId: number = Number(req.user.id);
    return await this.commentService.createComment(userId, postId, parentId, createCommentDto);
  }

  @Put(":commentId")
  @ApiOperation({
    summary: "댓글 수정",
    description: "댓글 작성 또는 대댓글 수정",
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, type: ResponseCommentDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  async updateComment(
    @Request() req: RequestWithUser,
    @Body() updateCommentDto: CreateCommentDto,
    @Param("commentId", ParseIntPipe) commentId: number,
  ): Promise<ResponseCommentDto> {
    const userId: number = Number(req.user.id);
    return await this.commentService.updateComment(userId, commentId, updateCommentDto);
  }

  @Delete(":commentId")
  @ApiOperation({
    summary: "댓글 삭제",
    description: "댓글 + 하위 댓글 삭제",
  })
  @ApiResponse({ status: 204, type: CommentDto })
  @UseGuards(AuthGuard("jwt"))
  async deleteComment(
    @Request() req: RequestWithUser,
    @Param("commentId", ParseIntPipe) commentId: number,
  ): Promise<CommentDto> {
    const userId: number = Number(req.user.id);
    return await this.commentService.deleteComment(userId, commentId);
  }
}
