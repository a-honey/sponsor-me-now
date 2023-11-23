import { MulterModule } from "@nestjs/platform-express";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { diskStorage } from "multer";

export const MulterConfigModule = MulterModule.register({
  storage: diskStorage({
    destination: path.join(__dirname, "../public/images"),
    filename: (req, file, callback): void => {
      const imageFormat: string = file.mimetype.split("/")[1];
      const filename: string = `img_${uuidv4()}.${imageFormat}`;
      callback(null, filename);
    },
  }),
});
