import React from 'react';
import styles from '../styles/UserId.UserHeader.module.scss';
import postPaymentHistory from '@/api/post/postPaymentHistory';

const UserHeader = ({
  data,
}: {
  data: {
    id: number;
    username: string;
    email: string;
    description: string;
    field: string;
  };
}) => {
  const { id, username, email, description, field } = data;
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
      <RequestPay email={email} username={username} id={id} />
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

const RequestPay = ({
  email,
  username,
}: {
  email: string;
  username: string;
  id: number;
}) => {
  const code = import.meta.env.VITE_IAMPORT_CODE;
  if (!window.IMP || !code) return;
  const { IMP } = window;
  IMP.init(code);

  const today = new Date();
  const hours = today.getHours(); // 시
  const minutes = today.getMinutes(); // 분
  const seconds = today.getSeconds(); // 초
  const milliseconds = today.getMilliseconds();
  const makeMerchantUid = hours + minutes + seconds + milliseconds;
  const requestPay = () => {
    (
      IMP.request_pay as (
        params: RequestPayParams,
        callback: (rsp: Response) => void,
      ) => void
    )(
      {
        pg: `kakaopay.${import.meta.env.VITE_IAMPORT_KAKAOPAY_ID!}`,
        pay_method: 'card',
        merchant_uid: `IMP_${makeMerchantUid}`,
        name: `로그인유저의 ${username} 후원`,
        amount: 1000,
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },
      (rsp: any) => {
        if (rsp.success) {
          console.log('결제성공', rsp);
          postPaymentHistory({
            applyNum: rsp.apply_num,
            bankCode: rsp.bank_code,
            bankName: rsp.bank_name,
            buyerAddr: rsp.buyer_addr,
            buyerEmail: rsp.buyer_email,
            buyerName: rsp.buyer_name,
            buyerPostcode: rsp.buyer_postcode,
            buyerTel: rsp.buyer_tel,
            cardName: rsp.card_name,
            cardQuota: rsp.card_quota,
            currency: rsp.currency,
            customData: rsp.custom_data,
            escrow: rsp.escrow,
            failReason: rsp.fail_reason,
            impUid: rsp.imp_uid,
            merchantUid: rsp.merchant_uid,
            name: rsp.name,
            paidAmount: rsp.paid_amount,
            paidAt: rsp.paid_at,
            payMethod: rsp.pay_method,
            pgId: rsp.pg_id,
            pgProvider: rsp.pg_provider,
            pgTid: rsp.pg_tid,
            receiptUrl: rsp.receipt_url,
            status: rsp.status,
            sellerName: username,
            sellerEmail: email,
          });
        } else {
          console.log('결제실패', rsp);
          // 결제 실패 시 로직
          // ...
        }
      },
    );
  };

  return <button onClick={requestPay}>후원하기</button>;
};
