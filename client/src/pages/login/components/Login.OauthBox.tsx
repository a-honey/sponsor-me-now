import styles from '../styles/Login.OauthBox.module.scss';

const OauthBox = () => {
  return (
    <div className={styles.container}>
      <div>OR</div>
      <button>카카오로그인</button>
    </div>
  );
};

export default OauthBox;
