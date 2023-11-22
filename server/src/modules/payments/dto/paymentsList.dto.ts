import { ApiProperty } from "@nestjs/swagger";

export class PaymentsListDto {
  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  sellerEmail: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  buyerEmail: string;

  @ApiProperty()
  buyerName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cardName: string;

  @ApiProperty()
  cardNumber: string;
}
