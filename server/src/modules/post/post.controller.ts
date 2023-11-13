import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostDto } from "./dto/post.dto";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { AuthGuard } from "@nestjs/passport";
import { ParseIntWithDefaultPipe } from "../../utils/parseIntWithDefaultPipe";

@ApiTags("Post")
@Controller("post")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    description: "게시글 작성",
    type: CreatePostDto,
  })
  @ApiResponse({ status: 201, type: PostDto })
  async createPost(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostDto> {
    const userId: number = Number(req.user.id);
    return await this.postService.createPost(userId, createPostDto);
  }

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    description: "게시글 리스트, ?search=all 일시 전체조회, 아닐시 후원자 최신게시글 조회",
  })
  @ApiResponse({ status: 200, type: PostDto })
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

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({ description: "게시글 상세 조회" })
  @ApiResponse({ status: 200, type: PostDto })
  async getPost(@Param("postId", ParseIntPipe) postId: number): Promise<PostDto> {
    return await this.postService.getPostAndIncrementView(postId);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    description: "게시글 삭제",
  })
  @ApiResponse({ status: 204, type: PostDto })
  async deletePost(
    @Request() req: RequestWithUser,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<PostDto> {
    const userId: number = Number(req.user.id);

    return await this.postService.deletePost(postId, userId);
  }
}
