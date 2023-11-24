import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ImpUidDto {
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
  sellerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  impUid: string;
}
