import { GetUserListDto } from "./getUserList.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserListDto {
  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  users: GetUserListDto[];
}
