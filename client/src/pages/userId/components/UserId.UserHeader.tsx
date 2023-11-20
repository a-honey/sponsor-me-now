import styles from '../styles/UserId.UserHeader.module.scss';
import PaymentSelect from './UserId.PaymentSelect';
import { useState } from 'react';

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
  const [isOpenPaymentSelect, setIsOpenPaymentSelect] = useState(false);
  const { id, username, email, description, field } = data;

  const toggleIsOpenPaymentSelect = () => {
    setIsOpenPaymentSelect((prev) => !prev);
  };
  return (
    <>
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
        <button onClick={toggleIsOpenPaymentSelect}>후원하기</button>
      </div>
      {isOpenPaymentSelect && (
        <PaymentSelect
          toggleIsOpenPaymentSelect={toggleIsOpenPaymentSelect}
          email={email}
          username={username}
          id={id}
        />
      )}
    </>
  );
};

export default UserHeader;
