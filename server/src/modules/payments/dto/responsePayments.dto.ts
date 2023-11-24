import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
export class ResponsePaymentsDto {
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sellerName: string;

  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  applyNum: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankCode: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerAddr: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerEmail: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerName: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerPostcode: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerTel: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelAmount: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cancelReason: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelledAt: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardCode: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardName: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardNumber: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cardQuota: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardType: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cashReceiptIssued: boolean;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  channel: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsObject()
  customData: {};

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUid: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUidUsage: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  embPgProvider: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  escrow: boolean;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  failReason: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  failedAt: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  impUid: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  merchantUid: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paidAt: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  payMethod: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgId: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgProvider: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pgTid: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  receiptUrl: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  startedAt: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  userAgent: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankCode: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankDate: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankHolder: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankIssuedAt: number;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankName: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankNum: string;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelHistories?: object;

  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelReceiptUrls?: object;
}
