import { useState } from 'react';
import withLoginTrue from '@/components/withLogin';
import ImgHeader from './components/MyPage.ImgHeader';
import UserHeader from './components/MyPage.UserHeader';
import PostWrite from './components/MyPage.PostWrite';
import { useGetUserById } from '@/hooks/useQueries';
import { useLoginStore } from '@/store';

const MyPage = () => {
  const [isWritingPost, setIsWritingPost] = useState(false);
  const toggleIsWritingPost = () => {
    setIsWritingPost((prev) => !prev);
  };
  const { loginId } = useLoginStore();
  const { data } = useGetUserById({ userId: loginId! });

  return (
    <article>
      <ImgHeader data={data} />
      <UserHeader data={data} toggleIsWritingPost={toggleIsWritingPost} />
      {isWritingPost && <PostWrite toggleIsWritingPost={toggleIsWritingPost} />}
    </article>
  );
};

export default withLoginTrue(MyPage);
