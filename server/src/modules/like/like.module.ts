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
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { LikeEntity } from "../../entities/like.entity";
import { UserEntity } from "../../entities/user.entity";
import { CommentEntity } from "../../entities/comment.entity";
import { PaymentsEntity } from "../../entities/payments.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([PostEntity, LikeEntity, UserEntity, CommentEntity, PaymentsEntity]),
  ],
  controllers: [LikeController],
  providers: [PostService, AuthService, UserService, LikeService, PrismaClient, JwtStrategy],
  exports: [LikeService],
})
export class LikeModule {}
