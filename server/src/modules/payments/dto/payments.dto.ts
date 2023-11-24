import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaymentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  buyerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sellerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sellerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNumber()
  applyNum?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankCode?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerAddr?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerEmail?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerName?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerPostcode?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerTel?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelAmount?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelHistory?: [];

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cancelReason?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelReceipt_urls?: [];

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelledAt?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardCode?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardName?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cardQuota?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardType?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cashReceipt_issued?: boolean;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  channel?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customData?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUidUsage?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  embPgProvider?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  escrow?: boolean;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  failReason?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  failedAt?: number;

  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  impUid!: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  merchantUid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paidAt?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  payMethod?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgId?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgProvider?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgTid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  startedAt?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankCode?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankDate?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankHolder?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankIssuedAt?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankName?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankNum?: string;
}
