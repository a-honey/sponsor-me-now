import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDataDto } from "./dto/updateUserData.dto";
import { ValidateUserDto } from "../auth/dto/validateUser.dto";
import path from "path";
import fs from "fs";
import { GetUserListDto } from "./dto/getUserList.dto";
import { ResponseUserListDto } from "./dto/responseUserList.dto";
import { UpdatedUserDto } from "./dto/updatedUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entitys/user";
import { Repository } from "typeorm";
import { Payments } from "../../entitys/payments";
import { Post } from "../../entitys/post";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getUserByEmail(email: string): Promise<ValidateUserDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("UserEntity not found");
    }
    return plainToInstance(ValidateUserDto, user);
  }

  async editUser(userId: number, updateUserDto: UpdateUserDataDto): Promise<UpdatedUserDto> {
    let user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    user = this.userRepository.merge(user, updateUserDto);

    const updatedUser = await this.userRepository.save(user);

    return plainToInstance(UpdatedUserDto, updatedUser);
  }

  async findUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return plainToInstance(UserDto, user);
  }

  async getUsers(page: number, limit: number): Promise<ResponseUserListDto> {
    const [users, totalCount] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    const totalPage: number = Math.ceil(totalCount / limit);

    return { users: plainToInstance(GetUserListDto, users), totalPage, currentPage: page };
  }

  async getRandomUsers(userId: number): Promise<GetUserListDto[]> {
    const users = await this.userRepository
      .createQueryBuilder("UserEntity")
      .where("UserEntity.id != :id", { id: userId })
      .andWhere("user.isSponsor = :isSponsor", { isSponsor: false })
      .orderBy("RANDOM()")
      .limit(7)
      .getMany();
    return users.map((user) => plainToInstance(GetUserListDto, user));
  }

  async getSponsoredUsers(page: number, limit: number): Promise<ResponseUserListDto> {
    const [users, totalCount] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isSponsor: false,
      },
      order: {
        createdAt: "DESC",
      },
    });

    const totalPage: number = Math.ceil(totalCount / limit);
    return { users: plainToInstance(GetUserListDto, users), totalPage, currentPage: page };
  }

  async getMySponsorUsers(
    page: number,
    limit: number,
    userId: number,
  ): Promise<ResponseUserListDto> {
    const [sponsorships, totalCount] = await this.paymentsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        buyerId: userId,
      },
      relations: ["seller"],
    });

    const users = Array.from(new Set(sponsorships.map((sponsorship) => sponsorship.seller)));

    const totalPage: number = Math.ceil(totalCount / limit);

    const userList: UserDto[] = users.map((user) => plainToInstance(UserDto, user));
    return { users: userList, totalPage, currentPage: page };
  }

  async getMySponsoredUsers(
    page: number,
    limit: number,
    userId: number,
  ): Promise<ResponseUserListDto> {
    const [sponsorships, totalCount] = await this.paymentsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        sellerId: userId,
      },
      relations: ["buyer"],
    });

    const users = Array.from(new Set(sponsorships.map((sponsorship) => sponsorship.buyer)));

    const totalPage: number = Math.ceil(totalCount / limit);

    const userList: GetUserListDto[] = users.map((user) => plainToInstance(GetUserListDto, user));
    return { users: userList, totalPage, currentPage: page };
  }

  async deleteUser(userId: number): Promise<UserDto> {
    const serverUrl: string = process.env.SERVER_URL;

    const posts = await this.postRepository.find({
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
    const deletedUser = await this.userRepository.findOne({ where: { id: userId } });

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

    await this.paymentsRepository.softDelete({ id: userId });

    return plainToInstance(UserDto, deletedUser);
  }
}
