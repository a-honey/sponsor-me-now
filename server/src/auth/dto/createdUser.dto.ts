import { ApiProperty } from "@nestjs/swagger";

export class CreatedUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isSponsor: boolean;
}
