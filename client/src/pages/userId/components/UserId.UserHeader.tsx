import React from 'react';
import styles from '../styles/UserId.UserHeader.module.scss';
import IMP from 'iamport';

const UserHeader = ({
  data,
}: {
  data: { id: number; username: string; description: string; field: string };
}) => {
  const { id, username, description, field } = data;
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.item}>
          <label>이름</label>
          <div>{username}</div>
        </div>
        <div className={styles.item}>
          <label>분야</label>
          <div>{field}</div>
        </div>
        <div className={styles.item}>
          <label>소개</label>
          <div>{description}</div>
        </div>
      </div>
      <RequestPay />
    </div>
  );
};

export default UserHeader;

interface Response {
  success: boolean;
}

interface RequestPayParams {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
}

IMP.init('imp73757270');

const RequestPay: React.FC = () => {
  const requestPay = () => {
    (
      IMP.request_pay as (
        params: RequestPayParams,
        callback: (rsp: Response) => void,
      ) => void
    )(
      {
        pg: 'kcp.{상점ID}',
        pay_method: 'card',
        merchant_uid: 'ORD20180131-0000011',
        name: '노르웨이 회전 의자',
        amount: 64900,
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },
      (rsp: Response) => {
        if (rsp.success) {
          // 결제 성공 시 로직
          // ...
        } else {
          // 결제 실패 시 로직
          // ...
        }
      },
    );
  };

  return <button onClick={requestPay}>후원하기</button>;
};
