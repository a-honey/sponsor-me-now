import styles from '../styles/UserId.UserHeader.module.scss';

const UserHeader = ({
  data,
}: {
  data: { id: number; username: string; description: string; field: string };
}) => {
  const { id, username, description, field } = data;
  return (
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
      <button>후원하기</button>
    </div>
  );
};

export default UserHeader;
