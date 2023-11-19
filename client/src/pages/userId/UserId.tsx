import { useLocation } from 'react-router-dom';
import ImgHeader from './components/UserId.ImgHeader';
import UserHeader from './components/UserId.UserHeader';
import { useGetUserById } from '@/hooks/useQueries';

const UserId = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const ownerId = currentPath.trim().split('/')[2];
  const { data, isLoading } = useGetUserById({ userId: Number(ownerId) });
  if (isLoading) {
    // 로딩 중이면 로딩 표시
    return <div>Loading...</div>;
  }
  return (
    <article>
      <ImgHeader />
      <UserHeader data={data} />
    </article>
  );
};

export default UserId;
