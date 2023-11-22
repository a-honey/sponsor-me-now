import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname?: string;

  @ApiProperty()
  profileImg?: string;

  @ApiProperty()
  backgroundImg?: string;

  @ApiProperty()
  field?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  isSponsor: boolean;

  @ApiProperty()
  account: number;
}
