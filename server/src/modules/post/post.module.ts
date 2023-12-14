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
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { Comment } from "../../entities/Comment";
import { Like } from "../../entities/Like";
import { Payments } from "../../entities/Payments";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([Post, User, Comment, Like, User, Payments]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthService, UserService, JwtStrategy],
  exports: [PostService],
})
export class PostModule {}
