import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/createPost.dto";
import { plainToInstance } from "class-transformer";
import { PostDto } from "./dto/post.dto";
import { deleteRelativeImage } from "../../utils/deleteRelativeImage";
import { PostTitlesDto } from "./dto/postTitles.dto";
import { ResponsePostTitlesDto } from "./dto/ResponsePostTitles.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaClient) {}

  async createPost(userId: number, createPostDto: CreatePostDto): Promise<PostDto> {
    const createdPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
    });
    return plainToInstance(PostDto, createdPost);
  }

  async getPostTitles(page: number, limit: number, userId: number): Promise<ResponsePostTitlesDto> {
    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalCount: number = posts.length;
    const totalPage: number = Math.ceil(totalCount / limit);
    const onlyTitles = posts.map((post) => post.title);

    return { posts: plainToInstance(PostTitlesDto, onlyTitles), currentPage: page, totalPage };
  }

  async getPostAndIncrementView(postId: number): Promise<PostDto> {
    const post = await this.prisma.post.update({
      where: { id: postId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        _count: {
          select: { like: true },
        },
        comment: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!post) throw new NotFoundException(`Post with ID ${postId} not found`);

    const postDto: PostDto = plainToInstance(PostDto, post);
    postDto.likeCount = post._count.like;
    delete postDto._count;

    postDto.comments = post.comment.map((comment) => ({
      content: comment.content,
      nickname: comment.author.nickname,
    }));
    delete postDto.comments;

    return postDto;
  }

  async getAllPosts(
    page: number,
    limit: number,
  ): Promise<{ posts: PostDto[]; totalPage: number; currentPage: number }> {
    const posts = await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount: number = posts.length;
    const totalPage: number = Math.ceil(totalCount / limit);
    return { posts: plainToInstance(PostDto, posts), totalPage, currentPage: page };
  }

  async getSponsoredPosts(
    page: number,
    limit: number,
    userId: number,
  ): Promise<{ posts: PostDto[]; totalPage: number; currentPage: number }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    let sponsoredIds: number[];

    if (user.isSponsor) {
      const sponsorRelations = await this.prisma.payment.findMany({ where: { buyerId: userId } });
      sponsoredIds = sponsorRelations.map((relation: { sellerId: number }) => relation.sellerId);
    }

    const posts = await this.prisma.post.findMany({
      where: {
        authorId: {
          in: sponsoredIds,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalCount = posts.length;
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
    const updatedPost = await this.prisma.post.update({
      where: {
        id_authorId: {
          id: postId,
          authorId: userId,
        },
      },
      data: { ...updatedPostData },
    });
    return plainToInstance(PostDto, updatedPost);
  }
}
