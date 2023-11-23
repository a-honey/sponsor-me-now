import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ImpResponseDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  apply_num?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_addr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_postcode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  buyer_tel?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cancel_amount?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancel_history?: [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  cancel_reason?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  cancel_receipt_urls?: [];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cancelled_at?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  card_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  card_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  card_number?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  card_quota?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  card_type?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cash_receipt_issued?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  channel?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  custom_data?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  customer_uid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  customer_uid_usage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emb_pg_provider?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  escrow?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fail_reason?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  failed_at?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imp_uid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  merchant_uid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  paid_at?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pay_method?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_provider?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pg_tid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  receipt_url?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  started_at?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_agent?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbank_date?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_holder?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vbank_issued_at?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vbank_num?: string;
}
