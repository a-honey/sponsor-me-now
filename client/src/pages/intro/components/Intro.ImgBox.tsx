import { useNavigate } from 'react-router-dom';
import styles from '../styles/Intro.ImgBox.module.scss';

const ImgBox = () => {
  const navigator = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div
          style={{
            background: "url('/logos.png')",
            width: '200px',
            height: '200px',
            backgroundPosition: '0px -170px',
          }}
        />
      </div>
      <TextBox />
      <div className={styles.nav}>
        <div />
        <div />
        <div />
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

const TextBox = () => {
  return (
    <div className={styles.textContainer}>
      <h2>후원자와 도움 받는 사람의 매칭</h2>
      <div>연결을 해요</div>
      <div>연결을 진짜로 해요</div>
    </div>
  );
};
