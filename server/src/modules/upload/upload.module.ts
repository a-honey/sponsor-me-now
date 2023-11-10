import { Module } from "@nestjs/common";
import { MulterConfigModule } from "./multer.module";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { PrismaClient } from "@Prisma/Client";

@Module({
  imports: [MulterConfigModule],
  providers: [UploadService, PrismaClient],
  controllers: [UploadController],
})
export class UploadModule {}
