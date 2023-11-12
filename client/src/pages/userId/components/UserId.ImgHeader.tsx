import styles from '../styles/UserId.ImgHeader.module.scss';
import UserImg from '@/components/components/UserImg';

const ImgHeader = () => {
  return (
    <div className={styles.container}>
      <img src="/logos.png" alt="hi" />
      <div>
        <UserImg />
      </div>
    </div>
  );
};

export default ImgHeader;
