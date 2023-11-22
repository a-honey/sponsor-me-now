import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImgHeader from './components/UserId.ImgHeader';
import UserHeader from './components/UserId.UserHeader';
import { useGetUserById } from '@/hooks/useQueries';
import { useLoginStore } from '@/store';
import withLoginTrue from '@/components/withLogin';

const UserId = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const currentPath = location.pathname;

  const { loginId } = useLoginStore();

  const ownerId = Number(currentPath.trim().split('/')[2]);
  const { data, isLoading } = useGetUserById({ userId: ownerId });

  useEffect(() => {
    if (ownerId === loginId!) {
      navigator('/mypage');
    }
  }, [loginId, ownerId, navigator]);

  if (isLoading) {
    // 로딩 중이면 로딩 표시
    return <div>Loading...</div>;
  }

  return (
    <article>
      <ImgHeader data={data} />
      <UserHeader data={data} />
    </article>
  );
};

export default withLoginTrue(UserId);
