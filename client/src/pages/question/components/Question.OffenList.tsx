import { useState } from 'react';
import styles from '../styles/Question.OffenList.module.scss';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

const OffenList = () => {
  return (
    <div className={styles.container}>
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default OffenList;

const Item = () => {
  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        {isOpenMoreInfo ? (
          <IoIosArrowDropup
            onClick={() => {
              setIsOpenMoreInfo(false);
            }}
          />
        ) : (
          <IoIosArrowDropdown
            onClick={() => {
              setIsOpenMoreInfo(true);
            }}
          />
        )}
        <h3>카카오페이 결제 외에 다른 방법이 있나요?</h3>
      </div>
      {isOpenMoreInfo && <div className={styles.answer}>없어용</div>}
    </div>
  );
};
