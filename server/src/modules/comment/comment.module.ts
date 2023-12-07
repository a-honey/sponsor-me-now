import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { LocalStrategy } from "../../passport/local.strategy";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PostService } from "../post/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../../entitys/post.entity";
import { CommentEntity } from "../../entitys/comment.entity";
import { UserEntity } from "../../entitys/user.entity";
import { PaymentsEntity } from "../../entitys/payments.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([PostEntity, CommentEntity, UserEntity, PaymentsEntity]),
  ],
  controllers: [CommentController],
  providers: [AuthService, CommentService, PostService, UserService, LocalStrategy],
  exports: [CommentService],
})
export class CommentModule {}
