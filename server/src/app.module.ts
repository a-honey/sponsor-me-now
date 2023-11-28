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
import { UserEntity } from "./entities/user.entity";
import { PostEntity } from "./entities/post.entity";
import { CommentEntity } from "./entities/comment.entity";
import { LikeEntity } from "./entities/like.entity";
import { PaymentsEntity } from "./entities/payments.entity";
import { AccountHistoryEntity } from "./entities/accountHistory.entity";

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
      port: 5432,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        PostEntity,
        CommentEntity,
        LikeEntity,
        PaymentsEntity,
        AccountHistoryEntity,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "public") }),
  ],
  providers: [Logger],
})
export class AppModule {}
