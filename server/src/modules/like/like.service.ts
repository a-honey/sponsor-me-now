import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { LikeDto } from "./dto/like.dto";

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaClient) {}

  async toggleLike(userId: number, postId: number): Promise<LikeDto> {
    let like = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (like) {
      await this.prisma.like.delete({
        where: { id: like.id },
      });
    } else {
      like = await this.prisma.like.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
    }
    return plainToInstance(LikeDto, like);
  }
}
