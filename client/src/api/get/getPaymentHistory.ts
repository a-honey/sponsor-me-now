import { instance } from '../instance';

export interface PaymentHistoryBodyType {
  totalPage: number;
  currentPage: number;
  payments: {
    id: number;
    buyerId: number;
    sellerId: number;
    sellerName: string;
    sellerEmail: string;
    amount: number;
    buyerEmail: string;
    buyerName: string;
    name: string;
    cardName: string;
    cardNumber: string;
  }[];
}

const getPaymentHistory = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await instance.get<PaymentHistoryBodyType>(
      `/payments/list?page=${page}&limit=${limit}}`,
    );
    return response.data;
  } catch (error) {
    console.error('getPaymentHistory 에러', error);
    throw error;
  }
};

export default getPaymentHistory;
