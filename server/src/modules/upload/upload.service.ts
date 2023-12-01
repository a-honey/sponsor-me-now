import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as path from "path";
import * as fs from "fs";
import { createUploadUrl } from "../../utils/createUploadUrl";
import { deleteRelativeImage } from "../../utils/deleteRelativeImage";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { PostEntity } from "../../entities/post.entity";

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaClient,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async uploadProfileImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("유저를 찾을 수 없습니다.");

    if (user.profileImg) {
      const serverUrl: string = process.env.SERVER_URL;
      const relativeImagePath: string = user.profileImg.replace(serverUrl, "").replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    const finalUrl: string = await createUploadUrl(imageUrl);
    await this.userRepository.update({ id: userId }, { profileImg: finalUrl });

    return finalUrl;
  }

  async uploadBackgroundImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("유저를 찾을 수 없습니다.");

    if (user.backgroundImg) {
      const serverUrl: string = process.env.SERVER_URL;
      const relativeImagePath: string = user.backgroundImg
        .replace(serverUrl, "")
        .replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }
    const finalUrl: string = await createUploadUrl(imageUrl);
    await this.userRepository.update({ id: userId }, { backgroundImg: finalUrl });

    return finalUrl;
  }

  async uploadPostImage(postId: number, imageUrl: string): Promise<string> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException("게시글을 찾을 수 없습니다.");

    if (post.postImg) await deleteRelativeImage(post);

    const finalUrl: string = await createUploadUrl(imageUrl);

    await this.postRepository.update({ id: postId }, { postImg: finalUrl });

    return finalUrl;
  }
}
