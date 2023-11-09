import { ApiProperty } from "@nestjs/swagger";

export class SubmitUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isSponsor: boolean;
}
