import withLoginTrue from '@/components/withLogin';
import News from './components/Main.News';
import RecommendUsers from './components/Main.RecommendUsers';

const Main = () => {
  return (
    <article>
      <h2>내가 후원한 사람들의 최신글 및 바로가기</h2>
      <News />
      <RecommendUsers />
    </article>
  );
};

export default withLoginTrue(Main);
