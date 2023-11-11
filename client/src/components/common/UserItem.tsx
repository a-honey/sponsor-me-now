import { useNavigate } from 'react-router-dom';
import UserImg from '../components/UserImg';
import styles from './index.module.scss';

const UserItem = () => {
  const navigator = useNavigate();
  return (
    <div
      className={styles.userItem}
      onClick={() => {
        navigator('/user/24');
      }}
    >
      <UserImg />
      <div>nickname</div>
    </div>
  );
};

export default UserItem;
