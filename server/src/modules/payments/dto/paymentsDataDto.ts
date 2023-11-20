import { ApiProperty } from "@nestjs/swagger";

export class PaymentsDataDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  apply_num?: string;

  @ApiProperty()
  bank_code?: string;

  @ApiProperty()
  bank_name?: string;

  @ApiProperty()
  buyer_addr: string;

  @ApiProperty()
  buyer_email: string;

  @ApiProperty()
  buyer_name: string;

  @ApiProperty()
  buyer_postcode: string;

  @ApiProperty()
  buyer_tel: string;

  @ApiProperty()
  cancel_amount?: number;

  @ApiProperty()
  cancel_history?: [];

  @ApiProperty()
  cancel_reason?: string;

  @ApiProperty()
  cancel_receipt_urls?: [];

  @ApiProperty()
  cancelled_at?: number;

  @ApiProperty()
  card_code?: string;

  @ApiProperty()
  card_name?: string;

  @ApiProperty()
  card_number?: string;

  @ApiProperty()
  card_quota?: number;

  @ApiProperty()
  card_type?: string;

  @ApiProperty()
  cash_receipt_issued: boolean;

  @ApiProperty()
  channel: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  custom_data?: string;

  @ApiProperty()
  customer_uid?: string;

  @ApiProperty()
  customer_uid_usage?: string;

  @ApiProperty()
  emb_pg_provider?: string;

  @ApiProperty()
  escrow: boolean;

  @ApiProperty()
  fail_reason?: string;

  @ApiProperty()
  failed_at?: number;

  @ApiProperty()
  imp_uid: string;

  @ApiProperty()
  merchant_uid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  paid_at: number;

  @ApiProperty()
  pay_method: string;

  @ApiProperty()
  pg_id: string;

  @ApiProperty()
  pg_provider: string;

  @ApiProperty()
  pg_tid: string;

  @ApiProperty()
  receipt_url: string;

  @ApiProperty()
  started_at: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  user_agent: string;

  @ApiProperty()
  vbank_code?: string;

  @ApiProperty()
  vbank_date?: number;

  @ApiProperty()
  vbank_holder?: string;

  @ApiProperty()
  vbank_issued_at?: number;

  @ApiProperty()
  vbank_name?: string;

  @ApiProperty()
  vbank_num?: string;
}
