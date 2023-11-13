import { GetUserListDto } from "./getUserList.dto";

export class UserListResponseDto {
  totalPage: number;
  currentPage: number;
  users: GetUserListDto[];
}
