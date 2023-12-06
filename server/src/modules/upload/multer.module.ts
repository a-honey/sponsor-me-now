import { MulterModule } from "@nestjs/platform-express";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { diskStorage } from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

export const s3 = new aws.S3({
  region: process.env.AWS_REGION,
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
