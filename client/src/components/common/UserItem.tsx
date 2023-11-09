import UserImg from '../components/UserImg';
import styles from './index.module.scss';

const UserItem = () => {
  return (
    <div className={styles.userItem}>
      <UserImg />
      <div>최근 유저</div>
    </div>
  );
};

export default UserItem;
