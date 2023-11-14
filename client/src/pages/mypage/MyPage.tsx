import withLoginTrue from '@/components/withLogin';
import ImgHeader from './components/MyPage.ImgHeader';
import UserHeader from './components/MyPage.UserHeader';

const MyPage = () => {
  return (
    <article>
      <ImgHeader />
      <UserHeader />
    </article>
  );
};

export default withLoginTrue(MyPage);