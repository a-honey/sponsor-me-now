import React from 'react';
import styles from '../styles/Payment.History.module.scss';

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
  return (
    <div className={styles.item}>
      <div>결제내역</div>
      <div>결제날짜</div>
      <div>결제가격</div>
    </div>
  );
};
