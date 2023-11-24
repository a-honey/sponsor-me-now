import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostDto } from "./dto/post.dto";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { AuthGuard } from "@nestjs/passport";
import { ParseIntWithDefaultPipe } from "../../pipes/parseIntWithDefaultPipe";
import { ResponsePostDto } from "./dto/responsePost.dto";

@ApiTags("Post")
@Controller("api/post")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: "게시글 작성",
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiResponse({ status: 201, type: ResponsePostDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  async createPost(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostDto> {
    const userId: number = Number(req.user.id);
    return await this.postService.createPost(userId, createPostDto);
  }

  @Get("/list")
  @ApiOperation({
    summary: "게시글 리스트",
    description: "게시글 리스트, ?search=all 일시 전체조회, 아닐시(없을시) 후원자 최신게시글 조회",
  })
  @ApiResponse({ status: 200, type: [PostDto] })
  @UseGuards(AuthGuard("jwt"))
  async getPosts(
    @Request() req: RequestWithUser,
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
    @Query("search") search: string,
  ): Promise<{ posts: PostDto[]; totalPage: number; currentPage: number }> {
    const userId: number = Number(req.user.id);
    if (search === "all") {
      return await this.postService.getAllPosts(page, limit);
    } else {
      return await this.postService.getSponsoredPosts(page, limit, userId);
    }
  }

  @Get(":postId")
  @ApiOperation({
    summary: "단일 게시글 상세 조회",
  })
  @ApiResponse({ status: 200, type: PostDto })
  @UseGuards(AuthGuard("jwt"))
  async getPost(@Param("postId", ParseIntPipe) postId: number): Promise<PostDto> {
    return await this.postService.getPostAndIncrementView(postId);
  }

  @Delete(":postId")
  @ApiOperation({
    summary: "게시글 삭제",
    description: "게시글에 포함된 댓글, 이미지 파일 삭제",
  })
  @ApiBody({
    description: "게시글 삭제",
  })
  @ApiResponse({ status: 204, type: PostDto })
  @UseGuards(AuthGuard("jwt"))
  async deletePost(
    @Request() req: RequestWithUser,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<PostDto> {
    const userId: number = Number(req.user.id);

    return await this.postService.deletePost(postId, userId);
  }

  @Put(":postId")
  @ApiOperation({
    summary: "단일 게시글 수정",
    description: "요청받은 필드 수정",
  })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, type: ResponsePostDto })
  @UseGuards(AuthGuard("jwt"))
  async updatePost(
    @Request() req: RequestWithUser,
    @Param("postId") postId: number,
    @Body() updatedPostData: CreatePostDto,
  ): Promise<PostDto> {
    const userId: number = Number(req.user.id);
    return await this.postService.updatedPost(userId, postId, updatedPostData);
  }
}
