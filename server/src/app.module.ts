import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { UploadModule } from "./modules/upload/upload.module";
import { PostModule } from "./modules/post/post.module";
import { LikeModule } from "./modules/like/like.module";
import { CommentModule } from "./modules/comment/comment.module";

@Module({
  imports: [AuthModule, UserModule, UploadModule, PostModule, LikeModule, CommentModule],
})
export class AppModule {}
