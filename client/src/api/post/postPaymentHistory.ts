import { instance } from '../instance';

export interface PostPaymentHistoryResponse {
  sellerName: string;
  sellerEmail: string;
  sellerId: number;
  impUid?: string;
}

const postPaymentHistory = async (body: PostPaymentHistoryResponse) => {
  try {
    const response = await instance.post('/payments/complete', body);
    return response.data;
  } catch (error) {
    console.error('postPaymentHistory:', error);
    throw error;
  }
};

export default postPaymentHistory;
