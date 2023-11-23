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
  apply_num?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bank_code?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  bank_name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_addr?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_email?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_postcode?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_tel?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancel_amount?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancel_history?: [];

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  cancel_reason?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancel_receipt_urls?: [];

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelled_at?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  card_code?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  card_name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  card_number?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  card_quota?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  card_type?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cash_receipt_issued?: boolean;

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
  custom_data?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customer_uid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  customer_uid_usage?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  emb_pg_provider?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  escrow?: boolean;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  fail_reason?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  failed_at?: number;

  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imp_uid!: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  merchant_uid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paid_at?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pay_method?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_id?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_provider?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_tid?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  receipt_url?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  started_at?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  user_agent?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_code?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbank_date?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_holder?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbank_issued_at?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_name?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_num?: string;
}
