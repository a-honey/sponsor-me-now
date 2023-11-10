import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDate,
} from "class-validator";
import { SerializeOptions } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@SerializeOptions({ strategy: "exposeAll" })
export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Exclude()
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  snsId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  provider?: string;

  @IsOptional()
  @ApiProperty()
  profileImg?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  field?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isSponsor!: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  subscribe?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  paymentHistory?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  post?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  comment?: [];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  manager!: boolean;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAt?: Date;
}
