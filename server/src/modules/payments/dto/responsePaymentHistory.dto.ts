import { ApiProperty } from "@nestjs/swagger";
export class ResponsePaymentHistoryDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  applyNum?: String;

  @ApiProperty()
  bankName?: String;

  @ApiProperty()
  sellerEmail: String;

  @ApiProperty()
  sellerName: String;

  @ApiProperty()
  buyerAddr: String;

  @ApiProperty()
  buyerEmail: String;

  @ApiProperty()
  buyerName: String;

  @ApiProperty()
  buyerPostcode: String;

  @ApiProperty()
  buyerTel: String;

  @ApiProperty()
  cardName: String;

  @ApiProperty()
  cardNumber: String;

  @ApiProperty()
  cardQuota: number;

  @ApiProperty()
  currency: String;

  @ApiProperty()
  customData?: String;

  @ApiProperty()
  impUid: String;

  @ApiProperty()
  merchantUid: String;

  @ApiProperty()
  name: String;

  @ApiProperty()
  paidAmount: number;

  @ApiProperty()
  paidAt: number;

  @ApiProperty()
  payMethod: String;

  @ApiProperty()
  pgProvider: String;

  @ApiProperty()
  pgTid: String;

  @ApiProperty()
  pgType?: String;

  @ApiProperty()
  receiptUrl: String;

  @ApiProperty()
  status: String;

  @ApiProperty()
  success: Boolean;
}
