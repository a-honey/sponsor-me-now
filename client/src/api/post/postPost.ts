import { instance } from '../instance';

export interface PostBodyType {
  title: string;
  content: string;
}
const postPost = async (body: PostBodyType) => {
  try {
    const response = await instance.post('/user', body);
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error;
  }
};

export default postPost;
