import { ApiProperty } from "@nestjs/swagger";

export class WithCommentAndNickDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  parentId?: number;

  @ApiProperty()
  nickname: string;
}
