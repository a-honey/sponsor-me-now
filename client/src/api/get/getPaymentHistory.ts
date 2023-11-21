import { instance } from '../instance';

interface ResponseBodyType {
  totalPage: number;
  currentPage: number;
  datas: {
    buyerId: number;
    sellerName: string;
    sellerEmail: string;
    amount: number;
    buyerEmail: string;
    buyerName: string;
    name: string;
    cardName: string;
    cardNumber: string;
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
