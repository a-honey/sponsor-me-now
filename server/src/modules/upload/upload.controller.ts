import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { UploadService } from "./upload.service";
import * as path from "path";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Express } from "express";

@ApiTags("Upload")
@Controller("api/upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/profile")
  @ApiOperation({
    summary: "프로필 이미지 업로드",
  })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileImage"))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("images", file.filename);
    return this.uploadService.uploadProfileImage(userId, imageUrl);
  }

  @Post("/background")
  @ApiOperation({
    summary: "백그라운드 이미지 업로드",
  })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileBackgroundImage"))
  async uploadBackgroundImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("images", file.filename);
    return this.uploadService.uploadBackgroundImage(userId, imageUrl);
  }

  @Post("/post/:postId")
  @ApiOperation({
    summary: "게시글 이미지 업로드",
  })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("postImage"))
  async uploadPostImage(
    @UploadedFile() file: Express.Multer.File,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<string> {
    const imageUrl: string = path.join("images", file.filename);
    return this.uploadService.uploadPostImage(postId, imageUrl);
  }
}
