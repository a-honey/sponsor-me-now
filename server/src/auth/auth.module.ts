import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "../passport/local.strategy";
import { UserService } from "../user/user.service";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
