import { useState } from 'react';
import styles from '../styles/Payment.History.module.scss';
import CancelModal from './Payment.CancelModal';

const History = () => {
  return (
    <div className={styles.container}>
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
      <PaymentItem />
    </div>
  );
};

export default History;

const PaymentItem = () => {
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const toggleIsOpenCancelModal = () => {
    setIsOpenCancelModal((prev) => !prev);
  };
  return (
    <>
      {isOpenCancelModal && (
        <CancelModal toggleIsOpenCancelModal={toggleIsOpenCancelModal} />
      )}
      <div className={styles.item}>
        <div>결제내역</div>
        <div>결제날짜</div>
        <div>결제가격</div>
        <button onClick={toggleIsOpenCancelModal}>결제 취소</button>
      </div>
    </>
  );
};
