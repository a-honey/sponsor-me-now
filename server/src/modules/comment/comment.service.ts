import { CreateCommentDto } from "./dto/createComment.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CommentDto } from "./dto/comment.dto";
import { ResponseCommentDto } from "./dto/responseComment.dto";
import { Repository } from "typeorm";
import { UserEntity } from "../../entitys/user.entity";
import { CommentEntity } from "../../entitys/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommentService {
  constructor(
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
    const user: UserEntity = await this.userRepository.findOne({ where: { id: userId } });
    const newComment = await this.commentRepository.save({
      ...createCommentDto,
      author: user,
      postId: postId,
      parentId: parentId,
    });
    const { author, ...rest } = newComment;
    return { ...plainToInstance(CommentDto, rest), nickname: author.nickname };
  }

  async updateComment(
    userId: number,
    commentId: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    await this.commentRepository.update(
      { id: commentId, authorId: userId },
      { ...updateCommentDto },
    );

    const updatedComment: CommentEntity = await this.commentRepository.findOne({
      where: { id: commentId, authorId: userId },
      relations: ["author"],
    });
    const { author, ...rest } = updatedComment;
    return { ...plainToInstance(CommentDto, rest), nickname: author.nickname };
  }

  async deleteComment(userId: number, commentId: number): Promise<CommentDto> {
    const comment: CommentEntity = await this.commentRepository.findOne({
      where: { id: commentId, authorId: userId },
    });
    if (!comment) {
      throw new NotFoundException("댓글을 찾을 수 없습니다.");
    }
    await this.commentRepository.delete(comment);
    return plainToInstance(CommentDto, comment);
  }
}
