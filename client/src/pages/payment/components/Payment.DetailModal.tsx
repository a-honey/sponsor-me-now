import { useGetPaymentHistoryById } from '@/hooks/useQueries';
import { useState } from 'react';
import CancelModal from './Payment.CancelModal';

const DetailModal = ({
  toggleIsOpenDetailModal,
  paymentId,
}: {
  toggleIsOpenDetailModal: () => void;
  paymentId: number;
}) => {
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const toggleIsOpenCancelModal = () => {
    setIsOpenCancelModal((prev) => !prev);
  };
  const { data } = useGetPaymentHistoryById({ paymentId });
  console.log(data);

  const handleRefundClick = () => {
    setIsOpenCancelModal((prev) => !prev);
  };

  return (
    <>
      {isOpenCancelModal && (
        <CancelModal toggleIsOpenCancelModal={toggleIsOpenCancelModal} />
      )}
      <div>
        <div>
          <h3>결제 내역</h3>
          <div>결제정보</div>
          <div>결제정보</div>
        </div>
        <button type="submit" className="green" onClick={handleRefundClick}>
          환불 요청
        </button>
        <button
          type="button"
          className="gray"
          onClick={toggleIsOpenDetailModal}
        >
          뒤로가기
        </button>
      </div>
    </>
  );
};

export default DetailModal;
