import { instance } from '../instance';

interface ResponseBodyType {
  totalPage: number;
  currentPage: number;
  posts: [];
}

const getPostList = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  try {
    const urlQueryString = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search,
    }).toString();
    const response = await instance.get<ResponseBodyType>(
      `/post/list?${urlQueryString}`,
    );
    return response.data;
  } catch (error) {
    console.error('getPostList 에러', error);
    throw error;
  }
};

export default getPostList;
