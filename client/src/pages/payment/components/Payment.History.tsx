import { useState } from 'react';
import styles from '../styles/Payment.History.module.scss';
import { useGetPaymentHistory } from '@/hooks/useQueries';
import { PaymentHistoryBodyType } from '@/api/get/getPaymentHistory';
import DetailModal from './Payment.DetailModal';

const History = () => {
  const { data } = useGetPaymentHistory({ page: 1, limit: 10 });
  return (
    <div className={styles.container}>
      {data?.payments.map((item) => (
        <PaymentItem data={item} />
      ))}
    </div>
  );
};

export default History;

const PaymentItem = ({
  data,
}: {
  data: PaymentHistoryBodyType['payments'][0];
}) => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  const toggleIsOpenDetailModal = () => {
    setIsOpenDetailModal((prev) => !prev);
  };
  return (
    <>
      {isOpenDetailModal && (
        <DetailModal
          toggleIsOpenDetailModal={toggleIsOpenDetailModal}
          paymentId={data.id}
        />
      )}
      <div className={styles.item}>
        <div>
          {data.buyerName}의 {data.sellerName} 후원내역
        </div>
        <div>
          <span>{data.amount} 원</span> 결제
        </div>
        <button className="gray" onClick={toggleIsOpenDetailModal}>
          상세내역
        </button>
      </div>
    </>
  );
};
