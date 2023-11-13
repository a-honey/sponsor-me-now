import { ApiProperty } from "@nestjs/swagger";

export class ResponseCreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
