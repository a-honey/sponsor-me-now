import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePaymentHistoryDto } from "./dto/createPaymentHistory.dto";

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaClient) {}

  async createPaymentsHistory(userId: number, createPaymentsHistoryData: CreatePaymentHistoryDto) {
    return this.prisma.paymentHistory.create({
      data: { userId: userId, ...createPaymentsHistoryData },
    });
  }
}
