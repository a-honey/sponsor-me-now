import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { UploadModule } from "./modules/upload/upload.module";
import { PostModule } from "./modules/post/post.module";
import { LikeModule } from "./modules/like/like.module";
import { CommentModule } from "./modules/comment/comment.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadModule,
    PostModule,
    LikeModule,
    CommentModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "public") }),
  ],
})
export class AppModule {}
