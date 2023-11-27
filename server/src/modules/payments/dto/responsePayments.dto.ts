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
import { Exclude } from "class-transformer";

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
  applyNum: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerAddr: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerPostcode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyerTel: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelAmount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cancelReason: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelledAt: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cardQuota: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardType: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cashReceiptIssued: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  channel: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  customData: {};

  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  customerUidUsage: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  embPgProvider: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  escrow: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  failReason: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  failedAt: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Exclude()
  impUid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  merchantUid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paidAt: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  payMethod: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pgId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pgProvider: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pgTid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  receiptUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  startedAt: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userAgent: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankCode: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankDate: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankHolder: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbankIssuedAt: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbankNum: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelHistories?: object;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancelReceiptUrls?: object;
}
