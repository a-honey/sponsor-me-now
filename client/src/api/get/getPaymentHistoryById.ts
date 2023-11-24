import { instance } from '../instance';

interface PaymentHistoryByIdType {
  id: number;
  buyerId: number;
  sellerId: number;
  sellerEmail: string;
  sellerName: string;
  amount: number;
  applyNum: string;
  bankCode: string;
  bankName: string;
  buyerAddr: string;
  buyerEmail: string;
  buyerName: string;
  buyerPostcode: string;
  buyerTel: string;
  cancelAmount: number;
  cancelHistory: ['string'];
  cancelReason: string;
  cancelReceipt_urls: ['string'];
  cancelledAt: number;
  cardCode: string;
  cardName: string;
  cardNumber: string;
  cardQuota: number;
  cardType: string;
  cashReceipt_issued: boolean;
  channel: string;
  currency: string;
  customData: string;
  customerUid: string;
  customerUidUsage: string;
  embPgProvider: string;
  escrow: boolean;
  failReason: string;
  failedAt: number;
  impUid: string;
  merchantUid: string;
  name: string;
  paidAt: number;
  payMethod: string;
  pgId: string;
  pgProvider: string;
  pgTid: string;
  receiptUrl: string;
  startedAt: number;
  status: string;
  userAgent: string;
  vbankCode: string;
  vbankDate: number;
  vbankHolder: string;
  vbankIssuedAt: number;
  vbankName: string;
  vbankNum: string;
}

const getPaymentHistoryById = async ({ paymentId }: { paymentId: number }) => {
  try {
    const response = await instance.get<PaymentHistoryByIdType>(
      `/payments/${paymentId}}`,
    );
    return response.data;
  } catch (error) {
    console.error('getPaymentHistoryById 에러', error);
    throw error;
  }
};

export default getPaymentHistoryById;
