import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ValidateUserDto } from "../auth/dto/validateUser.dto";
import { PrismaClient, User } from "@prisma/client";
import path from "path";
import fs from "fs";
import { GetUserListDto } from "./dto/getUserList.dto";
import { UserListResponseDto } from "./dto/userListResponse.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUserByEmail(email: string): Promise<ValidateUserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return plainToInstance(ValidateUserDto, user);
  }

  async editUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
    });
    return plainToInstance(UserDto, updatedUser);
  }

  async findUserById(userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return plainToInstance(UserDto, user);
  }

  async getUsers(page: number, limit: number): Promise<UserListResponseDto> {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalCount: number = users.length;
    const totalPage: number = Math.ceil(totalCount / limit);

    return { users: plainToInstance(GetUserListDto, users), totalPage, currentPage: page };
  }

  async getRandomUsers(userId: number): Promise<GetUserListDto[]> {
    const totalUsers: number = await this.prisma.user.count({
      where: {
        AND: [
          {
            id: {
              not: userId,
            },
          },
          {
            NOT: {
              sponsor: {
                some: {
                  sponsoredId: userId,
                },
              },
            },
          },
        ],
        isSponsor: false,
      },
    });

    const randomIndex: number = Math.floor(Math.random() * Math.max(0, totalUsers - 7));

    const users: User[] = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: userId,
            },
          },
          {
            NOT: {
              sponsor: {
                some: {
                  sponsoredId: userId,
                },
              },
            },
          },
        ],
        isSponsor: false,
      },
      skip: randomIndex,
      take: 7,
    });

    return users.map((user) => plainToInstance(GetUserListDto, user));
  }

  async getSponsoredUsers(page: number, limit: number): Promise<UserListResponseDto> {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isSponsor: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalCount = users.length;
    const totalPage: number = Math.ceil(totalCount / limit);
    return { users: plainToInstance(GetUserListDto, users), totalPage, currentPage: page };
  }

  async getMySponsorUsers(
    page: number,
    limit: number,
    userId: number,
  ): Promise<UserListResponseDto> {
    const sponsorships = await this.prisma.sponsor.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        sponsorId: userId,
      },
      select: {
        sponsored: true,
      },
    });

    const users = sponsorships.map((sponsorship) => sponsorship.sponsored);

    const totalCount = users.length;
    const totalPage: number = Math.ceil(totalCount / limit);

    const userList: UserDto[] = users.map((user) => plainToInstance(UserDto, user));
    return { users: userList, totalPage, currentPage: page };
  }

  async getMySponsoredUsers(
    page: number,
    limit: number,
    userId: number,
  ): Promise<UserListResponseDto> {
    const sponsorships = await this.prisma.sponsor.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        sponsoredId: userId,
      },
      select: {
        sponsor: true,
      },
    });

    const users = sponsorships.map((sponsorship) => sponsorship.sponsor);

    const totalCount = users.length;
    const totalPage: number = Math.ceil(totalCount / limit);

    const userList: UserDto[] = users.map((user) => plainToInstance(UserDto, user));
    return { users: userList, totalPage, currentPage: page };
  }

  async deleteUser(userId: number): Promise<UserDto> {
    const serverUrl: string = process.env.SERVER_URL;

    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
    });

    for (const post of posts) {
      if (post.postImg) {
        const relativeImagePath: string = post.postImg.replace(serverUrl, "").replace(/^\//, "");
        const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
        if (fs.existsSync(absoluteImagePath)) {
          fs.unlinkSync(absoluteImagePath);
        }
      }
    }

    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (deletedUser.backgroundImg) {
      const relativeImagePath: string = deletedUser.backgroundImg
        .replace(serverUrl, "")
        .replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    if (deletedUser.profileImg) {
      const relativeImagePath: string = deletedUser.profileImg
        .replace(serverUrl, "")
        .replace(/^\//, "");
      const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    return plainToInstance(UserDto, deletedUser);
  }
}
