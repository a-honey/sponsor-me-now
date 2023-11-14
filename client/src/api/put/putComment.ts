import { instance } from '../instance';

const putComment = async (commentId: number) => {
  try {
    const response = await instance.put(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('putComment 에러:', error);
    throw error;
  }
};

export default putComment;
