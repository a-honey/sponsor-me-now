export class CommentDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  postId: number;
  parentId?: number;
}
