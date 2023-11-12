import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as path from "path";
import * as fs from "fs";
import { createUploadUrl } from "../../utils/createUploadUrl";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaClient) {}

  async uploadProfileImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("유저를 찾을 수 없습니다.");

    if (user.profileImg) {
      const serverUrl: string = process.env.SERVER_URL || "http://localhost:3000";
      const relativeImagePath: string = user.profileImg.replace(serverUrl, "").replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      console.log(absoluteImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    const finalUrl: string = await createUploadUrl(imageUrl);
    await this.prisma.user.update({
      where: { id: userId },
      data: { profileImg: finalUrl },
    });

    return finalUrl;
  }

  async uploadBackgroundImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("유저를 찾을 수 없습니다.");

    if (user.backgroundImg) {
      const serverUrl: string = process.env.SERVER_URL || "http://localhost:3000";
      const relativeImagePath: string = user.backgroundImg
        .replace(serverUrl, "")
        .replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }
    const finalUrl: string = await createUploadUrl(imageUrl);
    await this.prisma.user.update({
      where: { id: userId },
      data: { backgroundImg: finalUrl },
    });

    return finalUrl;
  }
}
