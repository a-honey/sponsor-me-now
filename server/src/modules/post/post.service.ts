import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/createPost.dto";
import { plainToInstance } from "class-transformer";
import { PostDto } from "./dto/post.dto";

import { deleteRelativeImage } from "../../utils/deleteRelativeImage";

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
      },
    });

    if (!post) throw new NotFoundException(`Post with ID ${postId} not found`);

    const postDto: PostDto = plainToInstance(PostDto, post);
    postDto.likeCount = post._count.like;
    delete postDto._count;
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

  async getSponsoredPosts(page: number, limit: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    let sponsoredIds: number[];

    if (user.isSponsor) {
      const sponsorRelations = await this.prisma.sponsor.findMany({ where: { sponsorId: userId } });
      sponsoredIds = sponsorRelations.map(
        (relation: { sponsoredId: number }) => relation.sponsoredId,
      );
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

  async deletePost(postId: number, userId: number) {
    const deletedPost = await this.prisma.post.delete({
      where: { id: postId },
    });
    if (deletedPost.authorId !== userId) throw new NotFoundException();
    if (deletedPost.postImg) await deleteRelativeImage(deletedPost);

    return plainToInstance(PostDto, deletedPost);
  }
}
