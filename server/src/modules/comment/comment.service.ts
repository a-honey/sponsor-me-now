import { CreateCommentDto } from "./dto/createComment.dto";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { CommentDto } from "./dto/comment.dto";
import { ResponseCommentDto } from "./dto/responseComment.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async createComment(
    userId: number,
    postId: number,
    parentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
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
    return { ...plainToInstance(CommentDto, rest), nickname: author.nickname };
  }

  async updateComment(
    userId: number,
    commentId: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    const updatedComment = await this.prisma.comment.update({
      where: {
        id_authorId: {
          id: commentId,
          authorId: userId,
        },
      },
      data: { ...updateCommentDto },
      include: {
        author: true,
      },
    });
    const { author, ...rest } = updatedComment;
    return { ...plainToInstance(CommentDto, updatedComment), nickname: author.nickname };
  }

  async deleteComment(userId: number, commentId: number): Promise<CommentDto> {
    const deleteComment = await this.prisma.comment.delete({
      where: {
        id_authorId: {
          id: commentId,
          authorId: userId,
        },
      },
    });
    return plainToInstance(CommentDto, deleteComment);
  }
}
