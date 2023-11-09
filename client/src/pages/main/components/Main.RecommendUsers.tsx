import UserItem from '../../../components/common/UserItem';
import styles from '../styles/Main.RecommendUsers.module.scss';

const RecommendUsers = () => {
  return (
    <div className={styles.container}>
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </div>
  );
};

export default RecommendUsers;
