import { CreateCommentDto } from "./dto/createComment.dto";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async createComment(
    userId: number,
    postId: number,
    parentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<{ nickname: string; comment: CommentDto }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const newComment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId: userId,
        postId: postId,
        parentId: parentId,
      },
      include: {
        author: true,
      },
    });
    const { author, ...rest } = newComment;
    return { comment: plainToInstance(CommentDto, rest), nickname: author.nickname };
  }
}
