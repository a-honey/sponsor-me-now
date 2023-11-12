import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { PrismaClient } from "@prisma/client";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { PostService } from "../post/post.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [LikeController],
  providers: [PostService, AuthService, UserService, LikeService, PrismaClient, JwtStrategy],
  exports: [LikeService],
})
export class LikeModule {}
