import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
