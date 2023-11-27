import { PaymentCancelBodyType } from '@/api/post/postPaymentCancel';
import { usePostPaymentCancel } from '@/hooks/useMutations';
import { useForm } from 'react-hook-form';

const CancelModal = ({
  toggleIsOpenCancelModal,
  merchantUid,
  paymentsId,
}: {
  merchantUid: string;
  paymentsId: number;
  toggleIsOpenCancelModal: () => void;
}) => {
  const { register, handleSubmit } = useForm<PaymentCancelBodyType>();

  const postMutation = usePostPaymentCancel();

  const onSubmit = (data: PaymentCancelBodyType) => {
    postMutation.mutate({ ...data, merchantUid, paymentsId });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>결제 취소 금액</label>
      <input {...register('cancelRequestAmount')} />
      <label>결제 취소 사유</label>
      <input {...register('reason')} />
      <button type="submit" className="green">
        취소 요청
      </button>
      <button type="button" className="gray" onClick={toggleIsOpenCancelModal}>
        뒤로가기
      </button>
    </form>
  );
};

export default CancelModal;
