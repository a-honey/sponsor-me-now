import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { PrismaClient } from "@prisma/client";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { UserEntity } from "../../entities/user.entity";
import { CommentEntity } from "../../entities/comment.entity";
import { LikeEntity } from "../../entities/like.entity";
import { PaymentsEntity } from "../../entities/payments.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([
      PostEntity,
      UserEntity,
      CommentEntity,
      LikeEntity,
      UserEntity,
      PaymentsEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthService, UserService, PrismaClient, JwtStrategy],
  exports: [PostService],
})
export class PostModule {}
