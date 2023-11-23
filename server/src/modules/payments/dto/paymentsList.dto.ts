import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentsListDto {
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
  sellerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sellerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buyerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buyerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardNumber: string;
}
