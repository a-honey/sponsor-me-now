import { instance } from '../instance';

const deleteComment = async (commentId: number) => {
  try {
    const response = await instance.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('deleteComment 에러:', error);
    throw error;
  }
};

export default deleteComment;
