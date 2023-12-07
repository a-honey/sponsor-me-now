import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payments } from "../../entitys/payments";
import { User } from "../../entitys/user";
import { AccountHistory } from "../../entitys/accountHistory";
import { Post } from "../../entitys/post";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([User, Payments, AccountHistory, Post]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, AuthService, UserService, JwtStrategy],
  exports: [PaymentsService],
})
export class PaymentsModule {}
