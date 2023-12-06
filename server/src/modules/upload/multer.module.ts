import { MulterModule } from "@nestjs/platform-express";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { diskStorage } from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

export const s3 = new S3Client({
  region: "your-region",
  credentials: {
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-access-key",
  },
});

export const MulterConfigModule = MulterModule.register({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      const imageFormat: string = file.mimetype.split("/")[1];
      const filename: string = `img_${uuidv4()}.${imageFormat}`;
      cb(null, filename);
    },
  }),
  // storage: diskStorage({
  //   destination: path.join(__dirname, "../public/images"),
  //   filename: (req, file, callback): void => {
  //     const imageFormat: string = file.mimetype.split("/")[1];
  //     const filename: string = `img_${uuidv4()}.${imageFormat}`;
  //     callback(null, filename);
  //   },
  // }),
});
