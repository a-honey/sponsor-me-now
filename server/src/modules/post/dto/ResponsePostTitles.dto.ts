import { ApiProperty } from "@nestjs/swagger";
import { PostTitlesDto } from "./postTitles.dto";

export class ResponsePostTitlesDto {
  @ApiProperty()
  posts: PostTitlesDto[];

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPage: number;
}
