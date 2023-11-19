import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Intro.ImgBox.module.scss';
import { useEffect, useState } from 'react';

interface ImgsType {
  position: string;
  title: string;
  content1: string;
  content2: string;
}
const IMGS = [
  {
    position: '0px -170px',
    title: '후원자와 도움을 받는 사람의 연결',
    content1: '도움이 필요한 분들도',
    content2: '도움을 주고싶은 분들도',
  },
  {
    position: '-400px -200px',
    title: '타인에게 손을 내밀다',
    content1: '더 나은 세상을 만들어가요',
    content2: '우리 함께 할 수 있어요',
  },
  {
    position: '-200px -200px',
    title: '작은 도움이 큰 변화를 만듭니다',
    content1: '우리의 작은 노력이',
    content2: '누군가에게 희망을 전해줄 거에요',
  },
];

const ImgBox = () => {
  const navigator = useNavigate();
  const [curentIntroIndex, setCurrentIntroIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIntroIndex((prev) => {
        if (prev === 2) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [curentIntroIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div
          style={{
            background: "url('/logos.png')",
            width: '200px',
            height: '200px',
            backgroundPosition: IMGS[curentIntroIndex].position,
          }}
        />
      </div>
      <TextBox data={IMGS[curentIntroIndex]} />
      <div className={styles.nav}>
        <div
          className={curentIntroIndex === 0 ? styles.active : ''}
          onClick={() => {
            setCurrentIntroIndex(0);
          }}
        />
        <div
          className={curentIntroIndex === 1 ? styles.active : ''}
          onClick={() => {
            setCurrentIntroIndex(1);
          }}
        />
        <div
          className={curentIntroIndex === 2 ? styles.active : ''}
          onClick={() => {
            setCurrentIntroIndex(2);
          }}
        />
      </div>
      <div className={styles.btns}>
        <button
          className={styles.green}
          onClick={() => {
            navigator('/login');
          }}
        >
          로그인
        </button>
        <button
          className={styles.gray}
          onClick={() => {
            navigator('/register');
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default ImgBox;

const TextBox = ({ data }: { data: ImgsType }) => {
  return (
    <div className={styles.textContainer}>
      <h2>{data.title}</h2>
      <div>{data.content1}</div>
      <div>{data.content2}</div>
    </div>
  );
};
