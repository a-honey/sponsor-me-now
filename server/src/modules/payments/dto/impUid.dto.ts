import { ApiProperty } from "@nestjs/swagger";

export class ImpUidDto {
  @ApiProperty()
  sellerEmail: string;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  sellerId: number;

  @ApiProperty()
  impUid: string;
}
