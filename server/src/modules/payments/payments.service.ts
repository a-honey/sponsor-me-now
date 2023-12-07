import { Injectable } from "@nestjs/common";
import { ImpUidDto } from "./dto/impUid.dto";
import { ImpResponseDataDto } from "./dto/impResponseData.dto";
import { ResponsePaymentsDto } from "./dto/responsePayments.dto";
import { plainToInstance } from "class-transformer";
import { UserDto } from "../user/dto/user.dto";
import { PaymentsListDto } from "./dto/paymentsList.dto";
import { PaymentsDto } from "./dto/payments.dto";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../entitys/user.entity";
import { PaymentsEntity } from "src/entitys/payments.entity";
import { AccountHistoryEntity, TransactionType } from "../../entitys/accountHistory.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(PaymentsEntity)
    private paymentRepository: Repository<PaymentsEntity>,

    @InjectRepository(AccountHistoryEntity)
    private accountHistoryRepository: Repository<AccountHistoryEntity>,

    @InjectEntityManager()
    private manager: EntityManager,
  ) {}

  async createPayments(
    userId: number,
    data: ImpUidDto,
    paymentsData: ImpResponseDataDto,
  ): Promise<ResponsePaymentsDto> {
    const result = await this.manager.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOne(UserEntity, {
        where: { id: userId },
      });
      user.account += paymentsData.amount;
      const updatedUser = await transactionalEntityManager.save(UserEntity, user);

      const payment = transactionalEntityManager.create(PaymentsEntity, {
        buyerId: userId,
        sellerEmail: data.sellerEmail,
        sellerName: data.sellerName,
        sellerId: data.sellerId,
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
      });
      const createdPayments = await transactionalEntityManager.save(PaymentsEntity, payment);

      const accountHistory = transactionalEntityManager.create(AccountHistoryEntity, {
        withdrawnAmount: paymentsData.amount,
        remainingAmount: updatedUser.account,
        bank: paymentsData.bank_name,
        accountNumber: paymentsData.vbank_num,
        transactionType: TransactionType.DEPOSIT,
        user: user,
      });
      await transactionalEntityManager.save(AccountHistoryEntity, accountHistory);

      return createdPayments;
    });

    return plainToInstance(ResponsePaymentsDto, result);
  }

  async getPaymentsHistoryList(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ payments: PaymentsListDto[]; totalPages: number; currentPage: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const queryCondition = user.isSponsor ? { buyerId: userId } : { sellerId: userId };
    const selectOption = {
      id: true,
      buyerId: true,
      sellerId: true,
      sellerName: true,
      sellerEmail: true,
      amount: true,
      buyerEmail: true,
      buyerName: true,
      name: true,
      cardName: true,
      cardNumber: true,
    };

    const [payments, totalPayments]: [PaymentsEntity[], number] =
      await this.paymentRepository.findAndCount({
        where: queryCondition,
        skip: (page - 1) * limit,
        take: limit,
        select: selectOption,
      });

    const totalPages: number = Math.ceil(totalPayments / limit);

    const paymentsList: PaymentsListDto[] = payments.map((payment: PaymentsListDto) =>
      plainToInstance(PaymentsListDto, payment),
    );

    return {
      payments: paymentsList,
      currentPage: page,
      totalPages,
    };
  }

  async getPaymentsDetail(paymentsId: number): Promise<PaymentsDto> {
    const paymentsDetail = await this.paymentRepository.findOne({
      where: { id: paymentsId },
    });

    return plainToInstance(PaymentsDto, paymentsDetail);
  }

  async updatePayments(
    userId: number,
    updatePaymentsData: ImpResponseDataDto,
    id: number,
  ): Promise<ResponsePaymentsDto> {
    const result = await this.manager.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOne(UserEntity, {
        where: { id: userId },
      });
      user.account -= updatePaymentsData.cancel_amount;

      const updatedUser = await transactionalEntityManager.save(UserEntity, user);

      const payment = await transactionalEntityManager.findOne(PaymentsEntity, {
        where: { id: id },
      });
      payment.cancelAmount = updatePaymentsData.cancel_amount;
      payment.cancelReason = updatePaymentsData.cancel_reason;
      payment.cancelledAt = updatePaymentsData.cancelled_at;
      payment.status = updatePaymentsData.status;
      payment.cancelHistories = updatePaymentsData.cancel_history;
      payment.cancelReceiptUrls = updatePaymentsData.cancel_receipt_urls;

      const updatedPayment = await transactionalEntityManager.save(payment);

      const accountHistory = transactionalEntityManager.create(AccountHistoryEntity, {
        withdrawnAmount: updatePaymentsData.cancel_amount,
        remainingAmount: updatedUser.account,
        bank: updatePaymentsData.bank_name,
        accountNumber: updatePaymentsData.vbank_num,
        transactionType: TransactionType.WITHDRAW,
        user: user,
      });
      await transactionalEntityManager.save(AccountHistoryEntity, accountHistory);

      return updatedPayment;
    });
    return plainToInstance(ResponsePaymentsDto, result);
  }
}
