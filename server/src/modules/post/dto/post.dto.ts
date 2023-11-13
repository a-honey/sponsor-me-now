export class PostDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  viewCount: number;
  postImg: string;
  likeCount: number;
  _count?: object;
  comments?: { content: string; nickname: string }[];
}
