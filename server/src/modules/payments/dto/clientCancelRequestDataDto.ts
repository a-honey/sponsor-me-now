import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ClientCancelRequestDataDto {
  @IsNotEmpty()
  @IsString()
  merchantUid: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  cancelRequestAmount: string;

  @IsNotEmpty()
  @IsNumber()
  paymentsId: number;
}
