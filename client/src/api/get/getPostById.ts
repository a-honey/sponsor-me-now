import { instance } from '../instance';

export interface ResponsePostByIdType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  viewCount: number;
  postImg: string;
  likeCount: number;
  comment: {
    id: number;
    content: string;
    postId: number;
    profileImg: null | string;
    author: { username: string };
  }[];
}

const getPostById = async (id: number) => {
  try {
    const response = await instance.get<ResponsePostByIdType>(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error('getPostById 에러', error);
    throw error;
  }
};

export default getPostById;
