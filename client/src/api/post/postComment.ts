import { instance } from '../instance';

const postComment = async ({
  postId,
  parentId,
}: {
  postId: number;
  parentId: number;
}) => {
  try {
    const urlQueryString = new URLSearchParams({
      postId: postId.toString(),
      parentId: parentId.toString(),
    }).toString();
    const response = await instance.post(`/comment?${urlQueryString}`);
    return response.data;
  } catch (error) {
    console.error('postComment 에러:', error);
    throw error;
  }
};

export default postComment;
