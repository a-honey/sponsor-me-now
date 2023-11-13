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
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  nickname?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Exclude()
  snsId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Exclude()
  provider?: string;

  @ApiProperty()
  @IsOptional()
  @Exclude()
  profileImg?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Exclude()
  field?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Exclude()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Exclude()
  isSponsor!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Exclude()
  subscribe?: [];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Exclude()
  paymentHistory?: [];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Exclude()
  post?: [];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Exclude()
  comment?: [];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Exclude()
  manager!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Exclude()
  createdAt!: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Exclude()
  updatedAt?: Date;
}
