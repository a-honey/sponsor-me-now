import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  content: string;
}
