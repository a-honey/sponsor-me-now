import postPaymentHistory from '@/api/post/postPaymentHistory';
import { useLoginStore } from '@/store';
import { useState } from 'react';
import styles from '../styles/UserId.PaymentSelect.module.scss';

const PaymentSelect = ({
  email,
  username,
  id,
  toggleIsOpenPaymentSelect,
}: {
  email: string;
  username: string;
  id: number;
  toggleIsOpenPaymentSelect: () => void;
}) => {
  const [selectedAmount, setSelectedAmount] = useState<null | number>(null);
  const [customAmount, setCustomAmount] = useState<undefined | number>();

  const handleSelectChange = (amount: number | null) => {
    setSelectedAmount(amount);
    setCustomAmount(0);
  };

  const handleCustomInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = Number(event.target.value);
    if (isNaN(inputValue)) {
      alert('숫자를 입력해주세요.');
      setCustomAmount(undefined);
      return;
    } else {
      setSelectedAmount(null);
      setCustomAmount(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <h2>후원하기</h2>
      <label>
        <input
          type="radio"
          name="paymentAmount"
          value="10000"
          checked={selectedAmount === 10000}
          onChange={() => handleSelectChange(10000)}
        />
        10000원
      </label>

      <label>
        <input
          type="radio"
          name="paymentAmount"
          value="5000"
          checked={selectedAmount === 5000}
          onChange={() => handleSelectChange(5000)}
        />
        5000원
      </label>

      <label>
        <input
          type="radio"
          name="paymentAmount"
          value="3000"
          checked={selectedAmount === 3000}
          onChange={() => handleSelectChange(3000)}
        />
        3000원
      </label>

      <label>
        <input
          type="radio"
          name="paymentAmount"
          value="1000"
          checked={selectedAmount === 1000}
          onChange={() => handleSelectChange(1000)}
        />
        1000원
      </label>

      <label>
        <input
          type="radio"
          name="paymentAmount"
          value="custom"
          checked={selectedAmount === null && customAmount === undefined}
          onChange={() => handleSelectChange(null)}
        />
        직접입력
      </label>

      <input
        type="text"
        placeholder="원하는 금액 입력"
        value={customAmount}
        onChange={handleCustomInputChange}
        disabled={selectedAmount !== null}
      />
      <RequestPay
        payAmount={
          selectedAmount !== null && selectedAmount !== 0
            ? selectedAmount
            : Number(customAmount)
        }
        email={email}
        username={username}
        id={id}
        toggleIsOpenPaymentSelect={toggleIsOpenPaymentSelect}
      />
      <button className={styles.gray} onClick={toggleIsOpenPaymentSelect}>
        후원 취소
      </button>
    </div>
  );
};

export default PaymentSelect;

interface Response {
  apply_num?: number;
  bank_name?: string;
  buyer_addr?: string;
  buyer_email?: string;
  buyer_name?: string;
  buyer_postcode?: string;
  buyer_tel?: string;
  card_name?: string;
  card_quota?: number;
  custom_data?: string;
  imp_uid?: string;
  merchant_uid?: string;
  name?: string;
  paid_amount?: number;
  paid_at?: string;
  pay_method?: string;
  pg_provider?: string;
  pg_tid?: string;
  receipt_url?: string;
  status?: string;
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
  payAmount,
  toggleIsOpenPaymentSelect,
}: {
  email: string;
  username: string;
  id: number;
  payAmount: number;
  toggleIsOpenPaymentSelect: () => void;
}) => {
  const code = import.meta.env.VITE_IAMPORT_CODE;

  const { loginUsername, loginEmail } = useLoginStore();

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
        name: `${loginUsername}의 ${username} 후원`,
        amount: payAmount,
        buyer_email: loginEmail!,
        buyer_name: loginUsername!,
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },
      (rsp: Response) => {
        if (rsp.success) {
          console.log('결제성공', rsp);
          postPaymentHistory({
            sellerName: username,
            sellerEmail: email,
            impUid: rsp.imp_uid,
          });
        } else {
          console.log('결제실패', rsp);
          toggleIsOpenPaymentSelect();
        }
      },
    );
  };

  return (
    <button className={styles.green} onClick={requestPay}>
      후원하기
    </button>
  );
};
