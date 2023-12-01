import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { PrismaClient } from "@prisma/client";
import { JwtStrategy } from "../../passport/jwt.strategy";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsEntity } from "../../entities/payments.entity";
import { UserEntity } from "../../entities/user.entity";
import { AccountHistoryEntity } from "../../entities/accountHistory.entity";
import { PostEntity } from "../../entities/post.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    TypeOrmModule.forFeature([UserEntity, PaymentsEntity, AccountHistoryEntity, PostEntity]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, AuthService, UserService, PrismaClient, JwtStrategy],
  exports: [PaymentsService],
})
export class PaymentsModule {}
