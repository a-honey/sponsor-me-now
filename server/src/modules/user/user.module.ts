import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import * as process from "process";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { AuthService } from "../auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/User";
import { Payments } from "../../entities/Payments";
import { Post } from "../../entities/Post";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([User, Post, Payments]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
