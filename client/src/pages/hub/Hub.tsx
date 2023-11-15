import UserItem from '@/components/common/UserItem';
import { useGetUserList } from '@/hooks/useQueries';

const Hub = () => {
  const { data } = useGetUserList({ page: 1, limit: 10, search: 'all' });
  console.log(data);
  return (
    <article>
      {data?.users.map((item) => (
        <UserItem data={item} />
      ))}
    </article>
  );
};

export default Hub;
