import { instance } from '../instance';

const postPostLike = async (id: number) => {
  try {
    const response = await instance.post(`/like/${id}`);
    return response.data;
  } catch (error) {
    console.error('postPostLike 에러:', error);
    throw error;
  }
};

export default postPostLike;
