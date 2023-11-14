import { instance } from '../instance';

const putPost = async (postId: number) => {
  try {
    const response = await instance.put(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('putPost 에러:', error);
    throw error;
  }
};

export default putPost;
