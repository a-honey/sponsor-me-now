import { ApiProperty } from "@nestjs/swagger";

export class SubmitUserDataDto {
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
