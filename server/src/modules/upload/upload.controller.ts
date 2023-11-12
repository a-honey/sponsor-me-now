import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
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

  @Post()
  @ApiBody({ description: "[업로드]" })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileImage"))
  async uploadProfileImage(@UploadedFile() file, @Req() req: RequestWithUser): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("image", file.filename);
    return this.uploadService.uploadProfileImage(userId, imageUrl);
  }
}
