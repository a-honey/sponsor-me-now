import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class PostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  viewCount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postImg: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  likeCount: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  _count?: object;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  comments?: { nickname: string; content: string }[];
}
