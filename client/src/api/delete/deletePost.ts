import { instance } from '../instance';

const deletePost = async (postId: number) => {
  try {
    const response = await instance.delete(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('deletePost 에러:', error);
    throw error;
  }
};

export default deletePost;
