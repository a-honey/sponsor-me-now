import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentHistoryDto {
  @ApiProperty()
  applyNum?: string;

  @ApiProperty()
  sellerEmail: string;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  bankName?: string;

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
  cardName?: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  cardQuota: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  customData?: string;

  @ApiProperty()
  impUid: string;

  @ApiProperty()
  merchantUid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  paidAmount: number;

  @ApiProperty()
  paidAt: number;

  @ApiProperty()
  payMethod: string;

  @ApiProperty()
  pgProvider: string;

  @ApiProperty()
  pgTid: string;

  @ApiProperty()
  pgType?: string;

  @ApiProperty()
  receiptUrl: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  success: boolean;
}
