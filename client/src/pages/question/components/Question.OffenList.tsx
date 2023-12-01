import { useState } from 'react';
import styles from '../styles/Question.OffenList.module.scss';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

const QUESTION_LIST = [
  {
    question: '결제 취소는 언제까지 가능한가요?',
    answer: '일주일 이내로 가능합니다.',
  },
  {
    question: '결제 수수료는 얼마인가요?',
    answer: '추후 후원 단계에서 확인하실 수 있습니다.',
  },
  {
    question: '후원한 사람의 게시글이 안보여요',
    answer:
      '후원 대상자의 게시글이 없거나, 후원을 하지 않은 상태이면 보이지 않습니다',
  },
];
const OffenList = () => {
  return (
    <div className={styles.container}>
      {QUESTION_LIST.map((item) => (
        <Item data={item} />
      ))}
    </div>
  );
};

export default OffenList;

const Item = ({ data }: { data: { question: string; answer: string } }) => {
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
        <h3>{data.question}</h3>
      </div>
      {isOpenMoreInfo && <div className={styles.answer}>{data.answer}</div>}
    </div>
  );
};
