import { instance } from '../instance';

interface ResponseBodyType {
  totalPage: number;
  currentPage: number;
  datas: {
    buyerEmail?: string;
    buyerName?: string;
    sellerName: string;
    sellerEmail: string;
    merchantUid?: string;
    paidAmount?: number;
  };
}

const getPaymentHistory = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  try {
    const response = await instance.get<ResponseBodyType>(
      `/post/list?page=${page}&limit=${limit}${search && `&search=${search}`}`,
    );
    return response.data;
  } catch (error) {
    console.error('getPaymentHistory 에러', error);
    throw error;
  }
};

export default getPaymentHistory;
