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

export class GetUserListDto {
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
  @Exclude()
  snsId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Exclude()
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
  @Exclude()
  subscribe?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  @Exclude()
  paymentHistory?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  @Exclude()
  post?: [];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  @Exclude()
  comment?: [];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  @Exclude()
  manager!: boolean;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  @Exclude()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  @Exclude()
  updatedAt?: Date;

  @ApiProperty()
  @Exclude()
  account: number;
}
