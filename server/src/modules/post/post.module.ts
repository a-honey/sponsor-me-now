import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../../entitys/post.entity";
import { UserEntity } from "../../entitys/user.entity";
import { CommentEntity } from "../../entitys/comment.entity";
import { LikeEntity } from "../../entitys/like.entity";
import { PaymentsEntity } from "../../entitys/payments.entity";

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
  providers: [PostService, AuthService, UserService, JwtStrategy],
  exports: [PostService],
})
export class PostModule {}
