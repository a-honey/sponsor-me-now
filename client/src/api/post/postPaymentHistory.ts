import { instance } from '../instance';

export interface PostPaymentHistoryResponse {
  applyNum?: number;
  bankName?: string;
  buyerAddr?: string;
  buyerEmail?: string;
  buyerName?: string;
  sellerName: string;
  sellerEmail: string;
  buyerPostcode?: string;
  buyerTel?: string;
  cardName?: string;
  cardQuota?: number;
  customData?: string;
  impUid?: string;
  merchantUid?: string;
  name?: string;
  paidAmount?: number;
  paidAt?: string;
  payMethod?: string;
  pgProvider?: string;
  pgTid?: string;
  receiptUrl?: string;
  status?: string;
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
