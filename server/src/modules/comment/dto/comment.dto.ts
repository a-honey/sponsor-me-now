import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
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
  postId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
