import { instance } from '../instance';

export interface PaymentCancelBodyType {
  reason: string;
  cancelRequestAmount: string;
}
const postPaymentCancel = async (body: PaymentCancelBodyType) => {
  try {
    const response = await instance.post('/payments/cancel', body);
    return response.data;
  } catch (error) {
    console.error('postPaymentCancel 에러:', error);
    throw error;
  }
};

export default postPaymentCancel;
