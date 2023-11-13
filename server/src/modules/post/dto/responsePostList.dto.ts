import { ApiProperty } from "@nestjs/swagger";
import { PostDto } from "./post.dto";

export class ResponsePostListDto {
  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  posts: PostDto[];
}
