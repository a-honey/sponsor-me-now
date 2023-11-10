import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { UploadService } from "./upload.service";
import * as path from "path";
import { RequestWithUser } from "../user/interface/requestWithUser";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("profileImage"))
  async uploadProfileImage(@UploadedFile() file, @Req() req: RequestWithUser): Promise<string> {
    const userId: number = req.user.id;
    const imageUrl: string = path.join("image", file.filename);
    return this.uploadService.uploadProfileImage(userId, imageUrl);
  }
}
