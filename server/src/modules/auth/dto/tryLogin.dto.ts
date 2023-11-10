import { ApiProperty } from "@nestjs/swagger";

export class TryLoginDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
