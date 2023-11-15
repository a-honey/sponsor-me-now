import { instance } from '../instance';

export interface PostBodyType {
  title: string;
  content: string;
}
const postPost = async (body: PostBodyType) => {
  try {
    const response = await instance.post('/post', body);
    return response.data;
  } catch (error) {
    console.error('postPost:', error);
    throw error;
  }
};

export default postPost;
