import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { LocalStrategy } from "../../passport/local.strategy";
import { PrismaClient } from "@prisma/client";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PostService } from "../post/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { CommentEntity } from "../../entities/comment.entity";
import { UserEntity } from "../../entities/user.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([PostEntity, CommentEntity, UserEntity]),
  ],
  controllers: [CommentController],
  providers: [AuthService, CommentService, PostService, UserService, LocalStrategy, PrismaClient],
  exports: [CommentService],
})
export class CommentModule {}
