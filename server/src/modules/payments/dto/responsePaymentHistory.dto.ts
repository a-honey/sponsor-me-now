import { ApiProperty } from "@nestjs/swagger";
export class ResponsePaymentHistoryDto {
  @ApiProperty()
  id: number;

  buyerId: number;

  @ApiProperty()
  sellerEmail: string;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  applyNum: string;

  @ApiProperty()
  bankCode: string;

  @ApiProperty()
  bankName: string;

  @ApiProperty()
  buyerAddr: string;

  @ApiProperty()
  buyerEmail: string;

  @ApiProperty()
  buyerName: string;

  @ApiProperty()
  buyerPostcode: string;

  @ApiProperty()
  buyerTel: string;

  @ApiProperty()
  cancelAmount: number;

  @ApiProperty()
  cancelReason: string;

  @ApiProperty()
  cancelledAt: number;

  @ApiProperty()
  cardCode: string;

  @ApiProperty()
  cardName: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  cardQuota: number;

  @ApiProperty()
  cardType: string;

  @ApiProperty()
  cashReceiptIssued: boolean;

  @ApiProperty()
  channel: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  customData: {};

  @ApiProperty()
  customerUid: string;

  @ApiProperty()
  customerUidUsage: string;

  @ApiProperty()
  embPgProvider: string;

  @ApiProperty()
  escrow: boolean;

  @ApiProperty()
  failReason: string;

  @ApiProperty()
  failedAt: number;

  @ApiProperty()
  impUid: string;

  @ApiProperty()
  merchantUid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  paidAt: number;

  @ApiProperty()
  payMethod: string;

  @ApiProperty()
  pgId: string;

  @ApiProperty()
  pgProvider: string;

  @ApiProperty()
  pgTid: string;

  @ApiProperty()
  receiptUrl: string;

  @ApiProperty()
  startedAt: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  userAgent: string;

  @ApiProperty()
  vbankCode: string;

  @ApiProperty()
  vbankDate: number;

  @ApiProperty()
  vbankHolder: string;

  @ApiProperty()
  vbankIssuedAt: number;

  @ApiProperty()
  vbankName: string;

  @ApiProperty()
  vbankNum: string;

  @ApiProperty()
  cancelHistories?: [];

  @ApiProperty()
  cancelReceiptUrls?: [];
}
