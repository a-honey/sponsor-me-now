import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { LikeDto } from "./dto/like.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LikeEntity } from "src/entities/like.entity";
import { Repository } from "typeorm";

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaClient,
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}

  async toggleLike(userId: number, postId: number): Promise<LikeDto> {
    let like: LikeEntity = await this.likeRepository.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (like) {
      await this.likeRepository.delete(like);
    } else {
      like = this.likeRepository.create({ postId: postId, userId: userId });
      await this.likeRepository.save(like);
    }
    return plainToInstance(LikeDto, like);
  }
}
