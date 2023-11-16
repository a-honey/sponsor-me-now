import { useGetUserList } from '@/hooks/useQueries';
import UserItem from '../../../components/common/UserItem';
import styles from '../styles/List.UserList.module.scss';

const UserList = () => {
  const { data } = useGetUserList({ page: 1, limit: 10, search: 'sponsor' });

  return (
    <div className={styles.container}>
      {data?.users?.map((item) => (
        <UserItem data={item} />
      ))}
    </div>
  );
};

export default UserList;
