import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ClientCancelRequestDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  merchantUid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cancelRequestAmount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  paymentsId: number;
}
