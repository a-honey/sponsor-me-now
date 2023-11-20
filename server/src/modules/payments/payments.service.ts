import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ImpUidDto } from "./dto/impUid.dto";
import { PaymentsDataDto } from "./dto/paymentsDataDto";
import { ResponsePaymentHistoryDto } from "./dto/responsePaymentHistory.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaClient) {}

  async createPayments(
    userId: number,
    data: ImpUidDto,
    paymentsData: PaymentsDataDto,
  ): Promise<ResponsePaymentHistoryDto> {
    const result = await this.prisma.$transaction(async (prisma) => {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          account: {
            increment: paymentsData.amount,
          },
        },
      });

      const createdPayments = await this.prisma.payment.create({
        data: {
          buyerId: userId,
          sellerEmail: data.sellerEmail,
          sellerName: data.sellerName,
          amount: paymentsData.amount,
          applyNum: paymentsData.apply_num,
          bankCode: paymentsData.bank_code,
          bankName: paymentsData.bank_name,
          buyerAddr: paymentsData.buyer_addr,
          buyerEmail: paymentsData.buyer_email,
          buyerName: paymentsData.buyer_name,
          buyerPostcode: paymentsData.buyer_postcode,
          buyerTel: paymentsData.buyer_tel,
          cancelAmount: paymentsData.cancel_amount,
          cancelReason: paymentsData.cancel_reason,
          cancelledAt: paymentsData.cancelled_at,
          cardCode: paymentsData.card_code,
          cardName: paymentsData.card_name,
          cardNumber: paymentsData.card_number,
          cardQuota: paymentsData.card_quota,
          cardType: paymentsData.card_type,
          cashReceiptIssued: paymentsData.cash_receipt_issued,
          channel: paymentsData.channel,
          currency: paymentsData.currency,
          customData: paymentsData.custom_data,
          customerUid: paymentsData.customer_uid,
          customerUidUsage: paymentsData.customer_uid_usage,
          embPgProvider: paymentsData.emb_pg_provider,
          escrow: paymentsData.escrow,
          failReason: paymentsData.fail_reason,
          failedAt: paymentsData.failed_at,
          impUid: paymentsData.imp_uid,
          merchantUid: paymentsData.merchant_uid,
          name: paymentsData.name,
          paidAt: paymentsData.paid_at,
          payMethod: paymentsData.pay_method,
          pgId: paymentsData.pg_id,
          pgProvider: paymentsData.pg_provider,
          pgTid: paymentsData.pg_tid,
          receiptUrl: paymentsData.receipt_url,
          startedAt: paymentsData.started_at,
          status: paymentsData.status,
          userAgent: paymentsData.user_agent,
          vbankCode: paymentsData.vbank_code,
          vbankDate: paymentsData.vbank_date,
          vbankHolder: paymentsData.vbank_holder,
          vbankIssuedAt: paymentsData.vbank_issued_at,
          vbankName: paymentsData.vbank_name,
          vbankNum: paymentsData.vbank_num,
        },
      });

      await this.prisma.accountHistory.create({
        data: {
          withdrawnAmount: paymentsData.amount,
          remainingAmount: updatedUser.account,
          bank: paymentsData.bank_name,
          accountNumber: paymentsData.vbank_num,
          transactionType: "DEPOSIT",
          user: {
            connect: { id: userId },
          },
        },
      });
      return createdPayments;
    });

    return plainToInstance(ResponsePaymentHistoryDto, result);
  }
}
