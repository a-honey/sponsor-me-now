import { instance } from '../instance';

export interface PostBodyType {
  applyNum: string;
  bankCode: string;
  bankName: string;
  buyerAddr: string;
  buyerEmail: string;
  buyerName: string;
  buyerPostcode: string;
  buyerTel: string;
  cardName: string;
  cardQuota: number;
  currency: string;
  customData: string;
  escrow: boolean;
  failReason: string;
  impUid: string;
  merchantUid: string;
  name: string;
  paidAmount: number;
  paidAt: number;
  payMethod: string;
  pgId: string;
  pgProvider: string;
  pgTid: string;
  receiptUrl: string;
  status: string;
  sellerName: string;
  sellerEmail: string;
}

const postPaymentHistory = async (body: any) => {
  try {
    const response = await instance.post('/payments/complete', body);
    return response.data;
  } catch (error) {
    console.error('postPaymentHistory:', error);
    throw error;
  }
};

export default postPaymentHistory;
