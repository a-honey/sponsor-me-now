import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ValidateUserDto } from "../auth/dto/validateUser.dto";
import { PrismaClient } from "@prisma/client";

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

  async getUsers(
    page: number,
    limit: number,
  ): Promise<{ totalPage: number; currentPage: number; users: UserDto[] }> {
    const totalCount: number = await this.prisma.user.count();
    const totalPage: number = Math.ceil(totalCount / limit);

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { users: plainToInstance(UserDto, users), totalPage, currentPage: page };
  }

  async deleteUser(userId: number): Promise<UserDto> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return plainToInstance(UserDto, deletedUser);
  }
}
