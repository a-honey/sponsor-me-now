import { ApiProperty } from "@nestjs/swagger";

export class ResponseCommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  parentId?: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
