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
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Upload")
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/profile")
  @ApiBody({ description: "[업로드] 프로필 이미지" })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileImage"))
  async uploadProfileImage(@UploadedFile() file, @Req() req: RequestWithUser): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("image", file.filename);
    return this.uploadService.uploadProfileImage(userId, imageUrl);
  }

  @Post("/background")
  @ApiBody({ description: "[업로드] 프로필 백그라운드" })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileBackgroundImage"))
  async uploadBackgroundImage(@UploadedFile() file, @Req() req: RequestWithUser): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("image", file.filename);
    return this.uploadService.uploadBackgroundImage(userId, imageUrl);
  }

  @Post("/post/:postId")
  @ApiBody({ description: "[업로드] 게시글 이미지 " })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileBackgroundImage"))
  async uploadPostImage(
    @UploadedFile() file,
    @Req() req: RequestWithUser,
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<string> {
    const imageUrl: string = path.join("image", file.filename);
    return this.uploadService.uploadPostImage(postId, imageUrl);
  }
}
