import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./src/entities/User";
import { Post } from "./src/entities/Post";
import { Comment } from "./src/entities/Comment";
import { Like } from "./src/entities/Like";
import { Payments } from "./src/entities/Payments";
import { AccountHistory } from "./src/entities/AccountHistory";
import * as dotenv from "dotenv";

dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [User, Post, Comment, Like, Payments, AccountHistory],
  synchronize: true,
  migrations: ["dist/migration/*.js"],
  migrationsTableName: "migrations",
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};
