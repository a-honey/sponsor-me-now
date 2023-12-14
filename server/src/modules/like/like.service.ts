import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { LikeDto } from "./dto/like.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/entities/Like";
import { Repository } from "typeorm";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async toggleLike(userId: number, postId: number): Promise<LikeDto> {
    let like: Like = await this.likeRepository.findOne({
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
