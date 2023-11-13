import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDataDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  profileImg: string;

  @ApiProperty()
  field: string;

  @ApiProperty()
  description: string;
}
