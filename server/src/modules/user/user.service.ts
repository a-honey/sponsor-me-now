import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ValidateUserDto } from "../auth/dto/validateUser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
