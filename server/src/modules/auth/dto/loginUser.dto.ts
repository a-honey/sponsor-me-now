import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 20)
  nickname?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isSponsor: true;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
