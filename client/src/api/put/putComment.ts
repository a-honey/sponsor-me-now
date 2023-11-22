import { instance } from '../instance';

const putComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  try {
    const response = await instance.put(`/comment/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error('putComment 에러:', error);
    throw error;
  }
};

export default putComment;
