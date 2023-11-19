import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { PrismaClient } from "@prisma/client";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { PaymentsController } from "./PayMents.controller";
import { PaymentsService } from "./PayMents.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, AuthService, UserService, PrismaClient, JwtStrategy],
  exports: [PaymentsService],
})
export class PaymentsModule {}
