import path from "path";
import fs from "fs";
import { Post } from "@prisma/client";

export const deleteRelativeImage = async (post: Post): Promise<void> => {
  const serverUrl: string = process.env.SERVER_URL;
  const relativeImagePath: string = post.postImg.replace(serverUrl, "").replace(/^\//, "");
  const absoluteImagePath: string = path.join(__dirname, "..", "public", relativeImagePath);
  if (fs.existsSync(absoluteImagePath)) {
    fs.unlinkSync(absoluteImagePath);
  }
};
