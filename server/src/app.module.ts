import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
  imports: [AuthModule, UserModule, UploadModule],
})
export class AppModule {}
