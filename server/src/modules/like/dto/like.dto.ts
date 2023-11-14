import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  userId: number;
}