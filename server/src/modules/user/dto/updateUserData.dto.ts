import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDataDto {
  @ApiProperty()
  @IsOptional()
  @Length(1, 20)
  username: string;

  @ApiProperty()
  @IsOptional()
  @Length(1, 20)
  nickname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImg: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 200)
  field: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 500)
  description: string;
}
