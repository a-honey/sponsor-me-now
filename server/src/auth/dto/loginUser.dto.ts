import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isSponsor: true;
}
