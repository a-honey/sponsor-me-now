import { Module } from "@nestjs/common";
import { MulterConfigModule } from "./multer.module";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/User";
import { Post } from "../../entities/Post";

@Module({
  imports: [MulterConfigModule, TypeOrmModule.forFeature([User, Post])],
  providers: [UploadService, ConfigService],
  controllers: [UploadController],
})
export class UploadModule {}
