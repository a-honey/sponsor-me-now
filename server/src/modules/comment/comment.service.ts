import { CreateCommentDto } from "./dto/createComment.dto";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { CommentDto } from "./dto/comment.dto";
import { ResponseCommentDto } from "./dto/responseComment.dto";
import { Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { CommentEntity } from "../../entities/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaClient,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    parentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newComment = await this.commentRepository.save({
      ...createCommentDto,
      author: user,
      postId: postId,
      parentId: parentId,
    });
    // const newComment = await this.prisma.comment.create({
    //   data: {
    //     ...createCommentDto,
    //     authorId: userId,
    //     postId: postId,
    //     parentId: parentId,
    //   },
    //   include: {
    //     author: true,
    //   },
    // });
    const { author, ...rest } = newComment;
    return { ...plainToInstance(CommentDto, rest), nickname: author.nickname };
  }

  async updateComment(
    userId: number,
    commentId: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    // const updatedComment = await this.prisma.comment.update({
    //   where: {
    //     id_authorId: {
    //       id: commentId,
    //       authorId: userId,
    //     },
    //   },
    //   data: { ...updateCommentDto },
    //   include: {
    //     author: true,
    //   },
    // });
    await this.commentRepository.update(
      { id: commentId, authorId: userId },
      { ...updateCommentDto },
    );

    const updatedComment = await this.commentRepository.findOne({
      where: { id: commentId, authorId: userId },
      relations: ["author"],
    });
    const { author, ...rest } = updatedComment;
    return { ...plainToInstance(CommentDto, rest), nickname: author.nickname };
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
