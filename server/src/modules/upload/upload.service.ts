import { Injectable } from "@nestjs/common";
import { createUploadUrl } from "../../utils/createUploadUrl";
import { deleteRelativeImage } from "../../utils/deleteRelativeImage";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { Post } from "../../entities/Post";
import { s3 } from "./multer.module";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadService {
  private readonly isProduction: boolean;
  private readonly bucketName: string;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    private configService: ConfigService,
  ) {
    this.isProduction = configService.get("NODE_ENV") === "production";
    this.bucketName = configService.get("AWS_BUCKET_NAME");
  }

  async deleteImage(
    target: "user" | "post",
    targetId: number,
    field: "profileImg" | "backgroundImg" | "postImg",
    isProduction: boolean,
  ) {
    const repository = target === "user" ? this.userRepository : this.postRepository;
    const entity = await repository.findOne({ where: { id: targetId } });

    const image = entity[field];

    if (image) {
      if (isProduction) {
        const params = {
          Bucket: this.bucketName,
          Key: image.split(`${this.bucketName}/`)[1],
        };
        const deleteObjectCommand = new DeleteObjectCommand(params);
        await s3.send(deleteObjectCommand);
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

    if (user.profileImg) await this.deleteImage("user", userId, "profileImg", this.isProduction);
    return this.updateImage("user", userId, imageUrl, "profileImg", this.isProduction);
  }

  async uploadBackgroundImage(userId: number, imageUrl: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user.backgroundImg)
      await this.deleteImage("user", userId, "backgroundImg", this.isProduction);
    return this.updateImage("user", userId, imageUrl, "backgroundImg", this.isProduction);
  }

  async uploadPostImage(postId: number, imageUrl: string): Promise<string> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (post.postImg) await this.deleteImage("post", postId, "postImg", this.isProduction);
    return this.updateImage("post", postId, imageUrl, "postImg", this.isProduction);
  }
}
