import { ApiProperty } from "@nestjs/swagger";

export class ImpUidDto {
  @ApiProperty()
  sellerEmail: string;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  impUid: string;
}
