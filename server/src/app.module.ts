import { Logger, Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { UploadModule } from "./modules/upload/upload.module";
import { PostModule } from "./modules/post/post.module";
import { LikeModule } from "./modules/like/like.module";
import { CommentModule } from "./modules/comment/comment.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PaymentsModule } from "./modules/payments/payments.module";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entitys/user";
import { Post } from "./entitys/post";
import { Comment } from "./entitys/comment";
import { Like } from "./entitys/like";
import { Payments } from "./entitys/payments";
import { AccountHistory } from "./entitys/accountHistory";

@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadModule,
    PostModule,
    LikeModule,
    CommentModule,
    PaymentsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Post, Comment, Like, Payments, AccountHistory],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "public") }),
  ],
  providers: [Logger],
})
export class AppModule {}
