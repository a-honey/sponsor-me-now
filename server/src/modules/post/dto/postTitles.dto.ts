import { ApiProperty } from "@nestjs/swagger";

export class PostTitlesDto {
  @ApiProperty()
  title: string;
}
