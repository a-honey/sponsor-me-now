import { instance } from '../instance';

const postComment = async ({
  postId,
  parentId,
  content,
}: {
  postId: number;
  parentId?: number;
  content: string;
}) => {
  try {
    const urlQueryString = new URLSearchParams(
      parentId
        ? {
            postId: postId.toString(),
            parentId: parentId.toString(),
          }
        : {
            postId: postId.toString(),
          },
    ).toString();
    const response = await instance.post(`/comment?${urlQueryString}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error('postComment 에러:', error);
    throw error;
  }
};

export default postComment;
