import { Module } from "@nestjs/common";
import { MulterConfigModule } from "./multer.module";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { PrismaClient } from "@prisma/client";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entitys/user";
import { Post } from "../../entitys/post";

@Module({
  imports: [MulterConfigModule, TypeOrmModule.forFeature([User, Post])],
  providers: [UploadService, PrismaClient],
  controllers: [UploadController],
})
export class UploadModule {}
