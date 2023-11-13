import { ApiProperty } from "@nestjs/swagger";

export class ResponsePostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  postImg: number;
}
