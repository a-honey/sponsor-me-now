import { useGetUserList } from '@/hooks/useQueries';
import UserItem from '../../../components/common/UserItem';
import styles from '../styles/Main.RecommendUsers.module.scss';

const RecommendUsers = () => {
  const { data } = useGetUserList({ page: 1, limit: 7, search: 'random' });
  return (
    <div className={styles.container}>
      {data?.users?.map((item) => (
        <UserItem data={item} />
      ))}
    </div>
  );
};

export default RecommendUsers;
