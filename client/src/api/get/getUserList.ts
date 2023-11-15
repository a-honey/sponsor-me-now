import { instance } from '../instance';

const getUserList = async ({
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
    const response = await instance.get<{
      users: [
        {
          id: number;
          email: string;
          username: string;
          nickname: string | null;
          profileImg: string | null;
          backgroundImg: string | null;
          field: string | null;
          description: string | null;
          isSponsor: boolean;
        },
      ];
      totalPage: number;
      currentPage: number;
    }>(`/user/list?${urlQueryString}`);
    return response.data;
  } catch (error) {
    console.error('getUserList 에러', error);
    throw error;
  }
};

export default getUserList;
