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
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { Like } from "./entities/Like";
import { Payments } from "./entities/Payments";
import { AccountHistory } from "./entities/AccountHistory";
import * as dotenv from "dotenv";
import { typeOrmConfig } from "../typeorm.config";

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadModule,
    PostModule,
    LikeModule,
    CommentModule,
    PaymentsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "public") }),
  ],
  providers: [Logger],
})
export class AppModule {}
