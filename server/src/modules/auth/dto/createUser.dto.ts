import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isSponsor: boolean;
}
