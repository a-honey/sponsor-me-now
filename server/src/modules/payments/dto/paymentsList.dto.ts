import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class PaymentsListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  sellerId: number;

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
