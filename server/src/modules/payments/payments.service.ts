import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ImpUidDto } from "./dto/ImpUid.dto";
import { PaymentsDataDto } from "./dto/paymentsDataDto";

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaClient) {}

  async createPaymentsHistory(userId: number, data: ImpUidDto, paymentsData: PaymentsDataDto) {
    /*  return this.prisma.paymentHistory.create({
      data: { userId: userId, amount: paymentsData.aumont },
    });*/
  }
}
