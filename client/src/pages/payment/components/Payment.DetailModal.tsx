import { useGetPaymentHistoryById } from '@/hooks/useQueries';
import { useState } from 'react';
import CancelModal from './Payment.CancelModal';
import styles from '../styles/Payment.DetailModal.module.scss';
import { useNavigate } from 'react-router-dom';

const DetailModal = ({
  toggleIsOpenDetailModal,
  paymentId,
}: {
  toggleIsOpenDetailModal: () => void;
  paymentId: number;
}) => {
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const navigator = useNavigate();

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
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h3>결제 내역</h3>
          <div className={styles.buyerName}>구매자: {data?.buyerName}</div>
          <ul>
            <li key="seller">
              <div className={styles.name}>후원 대상 :</div>
              <div>{data?.sellerName}</div>
            </li>
            <li key="amount">
              <div className={styles.name}>후원 금액 :</div>
              <div>{data?.amount} 원</div>
            </li>
            <li key="pg">
              <div className={styles.name}>결제처 :</div>
              <div>{data?.pgProvider} 원</div>
            </li>
            <li key="card">
              <div className={styles.name}>카드정보</div>
              <div>
                {data?.cardNumber ? data.cardNumber : '카드정보가 없습니다'}
              </div>
            </li>
          </ul>
        </div>
        {isOpenCancelModal && (
          <CancelModal toggleIsOpenCancelModal={toggleIsOpenCancelModal} />
        )}
        <button type="submit" className="green" onClick={handleRefundClick}>
          환불 요청
        </button>
        <button
          type="button"
          className="gray"
          onClick={() => navigator('/question')}
        >
          문의 남기기
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
