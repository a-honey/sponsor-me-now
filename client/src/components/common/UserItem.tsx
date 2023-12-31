import { useNavigate } from 'react-router-dom';
import UserImg from '../components/UserImg';
import styles from './index.module.scss';

const UserItem = ({
  data,
}: {
  data: {
    id: number;
    username: string;
    profileImg: string | null;
    isSponsor: boolean;
  };
}) => {
  const navigator = useNavigate();

  const { id, username, profileImg } = data;
  return (
    <div
      className={styles.userItem}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <div className={styles.imgContainer}>
        <UserImg src={profileImg} />
      </div>
      <div>{username}</div>
    </div>
  );
};

export default UserItem;
