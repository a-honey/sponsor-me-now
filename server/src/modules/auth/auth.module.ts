import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "../../passport/local.strategy";
import { UserService } from "../user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, PrismaClient],
  exports: [AuthService],
})
export class AuthModule {}
