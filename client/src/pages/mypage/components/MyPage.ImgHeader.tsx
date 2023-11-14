import styles from '../styles/MyPage.ImgHeader.module.scss';
import UserImg from '@/components/components/UserImg';

const ImgHeader = () => {
  return (
    <div className={styles.container}>
      <img src="/logos.png" alt="hi" />
      <input type="file" />
      <div>
        <UserImg />
      </div>
    </div>
  );
};

export default ImgHeader;
