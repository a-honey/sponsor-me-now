import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/createPost.dto";
import { plainToInstance } from "class-transformer";
import { PostDto } from "./dto/post.dto";
import { deleteRelativeImage } from "../../utils/deleteRelativeImage";
import { PostTitlesDto } from "./dto/postTitles.dto";
import { ResponsePostTitlesDto } from "./dto/ResponsePostTitles.dto";
import { PostEntity } from "../../entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CommentEntity } from "../../entities/comment.entity";
import { UserEntity } from "../../entities/user.entity";
import { PaymentsEntity } from "../../entities/payments.entity";

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaClient,

    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(PaymentsEntity)
    private paymentsRepository: Repository<PaymentsEntity>,
  ) {}

  async createPost(userId: number, createPostDto: CreatePostDto): Promise<PostDto> {
    const post: PostEntity = this.postRepository.create({
      ...createPostDto,
      authorId: userId,
    });

    const createdPost: PostEntity = await this.postRepository.save(post);

    return plainToInstance(PostDto, createdPost);
  }

  async getPostTitles(page: number, limit: number, userId: number): Promise<ResponsePostTitlesDto> {
    const [posts, totalCount] = await this.postRepository.findAndCount({
      where: { authorId: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    const totalPage: number = Math.ceil(totalCount / limit);
    const onlyTitles: string[] = posts.map((post) => post.title);

    return { posts: plainToInstance(PostTitlesDto, onlyTitles), currentPage: page, totalPage };
  }

  async getPostAndIncrementView(postId: number): Promise<PostDto> {
    let post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ["comment", "comment.author"],
    });
    if (!post) throw new NotFoundException("게시글을 찾을 수 없습니다.");

    post.viewCount += 1;
    post = await this.postRepository.save(post);

    const commentList = await this.commentRepository.find({
      where: { postId: postId },
      relations: ["author"],
    });

    const postDto: PostDto = plainToInstance(PostDto, post);
    postDto.likeCount = post.like.length;

    postDto.comments = commentList.map((comment) => ({
      content: comment.content,
      nickname: comment.author.nickname,
    }));
    return postDto;
  }

  async getAllPosts(
    page: number,
    limit: number,
  ): Promise<{ posts: PostDto[]; totalPage: number; currentPage: number }> {
    const [posts, totalCount] = await this.postRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    const totalPage: number = Math.ceil(totalCount / limit);
    return { posts: plainToInstance(PostDto, posts), totalPage, currentPage: page };
  }

  async getSponsoredPosts(
    page: number,
    limit: number,
    userId: number,
  ): Promise<{ posts: PostDto[]; totalPage: number; currentPage: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    let sponsoredIds: number[];

    if (user.isSponsor) {
      const sponsorRelations = await this.paymentsRepository.find({ where: { buyerId: userId } });
      sponsoredIds = sponsorRelations.map((relation: { sellerId: number }) => relation.sellerId);
    }

    const [posts, totalCount] = await this.postRepository.findAndCount({
      where: {
        authorId: In(sponsoredIds),
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    const totalPage: number = Math.ceil(totalCount / limit);

    return { posts: plainToInstance(PostDto, posts), totalPage, currentPage: page };
  }

  async deletePost(postId: number, userId: number): Promise<PostDto> {
    const deletedPost = await this.prisma.post.delete({
      where: { id: postId },
    });
    if (deletedPost.authorId !== userId) throw new NotFoundException();
    if (deletedPost.postImg) await deleteRelativeImage(deletedPost);

    return plainToInstance(PostDto, deletedPost);
  }

  async updatedPost(
    userId: number,
    postId: number,
    updatedPostData: CreatePostDto,
  ): Promise<PostDto> {
    let post: PostEntity = await this.postRepository.findOne({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!post) {
      throw new NotFoundException(`해당 게시글을 찾을 수 없습니다.`);
    }

    post = this.postRepository.merge(post, updatedPostData);
    const updatedPost: PostEntity = await this.postRepository.save(post);

    return plainToInstance(PostDto, updatedPost);
  }
}
