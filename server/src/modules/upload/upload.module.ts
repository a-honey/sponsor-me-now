import { Module } from "@nestjs/common";
import { MulterConfigModule } from "./multer.module";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { PrismaClient } from "@prisma/client";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../entitys/user.entity";
import { PostEntity } from "../../entitys/post.entity";

@Module({
  imports: [MulterConfigModule, TypeOrmModule.forFeature([UserEntity, PostEntity])],
  providers: [UploadService, PrismaClient],
  controllers: [UploadController],
})
export class UploadModule {}
