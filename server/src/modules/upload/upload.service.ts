import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { createUploadUrl } from "../../utils/createUploadUrl";
import { deleteRelativeImage } from "../../utils/deleteRelativeImage";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entitys/user";
import { Repository } from "typeorm";
import { Post } from "../../entitys/post";
import { s3 } from "./multer.module";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async deleteImage(target: "user" | "post", targetId: number, isProduction: boolean) {
    const repository = target === "user" ? this.userRepository : this.postRepository;
    const entity = await repository.findOne({ where: { id: targetId } });

    if (!entity) throw new NotFoundException(`${target}를 찾을 수 없습니다.`);

    const imageField = target === "user" ? "profileImg" : "postImg";
    const image = entity[imageField];

    if (image) {
      if (isProduction) {
        try {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image.split(`${process.env.AWS_BUCKET_NAME}/`)[1],
          };
          const deleteObjectCommand = new DeleteObjectCommand(params);
          await s3.send(deleteObjectCommand);
        } catch (error) {
          throw new InternalServerErrorException("Failed to delete image from S3");
        }
      } else {
        await deleteRelativeImage(image);
      }
    }
    return;
  }

  async updateImage(
    target: "user" | "post",
    targetId: number,
    imageUrl: string,
    field: "profileImg" | "backgroundImg" | "postImg",
    isProduction: boolean,
  ): Promise<string> {
    const repository = target === "user" ? this.userRepository : this.postRepository;

    let finalUrl: string;

    if (isProduction) {
      finalUrl = imageUrl;
    } else {
      finalUrl = await createUploadUrl(imageUrl);
    }

    await repository.update({ id: targetId }, { [field]: finalUrl });

    return finalUrl;
  }

  async uploadProfileImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException("Failed to find user");

    const isProduction = process.env.NODE_ENV === "production";

    if (user.profileImg) await this.deleteImage("user", userId, isProduction);
    return this.updateImage("user", userId, imageUrl, "profileImg", isProduction);
  }

  async uploadBackgroundImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("Failed to find user");

    const isProduction = process.env.NODE_ENV === "production";

    if (user.backgroundImg) await this.deleteImage("user", userId, isProduction);
    return this.updateImage("user", userId, imageUrl, "backgroundImg", isProduction);
  }

  async uploadPostImage(postId: number, imageUrl: string): Promise<string> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException("Failed to find post");

    const isProduction = process.env.NODE_ENV === "production";

    if (post.postImg) await this.deleteImage("post", postId, isProduction);
    return this.updateImage("post", postId, imageUrl, "postImg", isProduction);
  }
}
