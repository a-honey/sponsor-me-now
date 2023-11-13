export class WithCommentAndNickDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  postId: number;
  parentId?: number;
  nickname: string;
}
