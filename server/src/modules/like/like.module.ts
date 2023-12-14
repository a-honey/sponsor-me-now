import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { PostService } from "../post/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../../entities/Post";
import { Like } from "../../entities/Like";
import { User } from "../../entities/User";
import { Comment } from "../../entities/Comment";
import { Payments } from "../../entities/Payments";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([Post, Like, User, Comment, Payments]),
  ],
  controllers: [LikeController],
  providers: [PostService, AuthService, UserService, LikeService, JwtStrategy],
  exports: [LikeService],
})
export class LikeModule {}
