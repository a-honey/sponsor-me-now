import styles from '../styles/UserId.UserHeader.module.scss';

const UserHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div>username</div>
        <div>field</div>
        <div>description</div>
      </div>
      <button>후원하기</button>
    </div>
  );
};

export default UserHeader;
