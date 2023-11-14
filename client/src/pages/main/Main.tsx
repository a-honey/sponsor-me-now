import withLoginTrue from '@/components/withLogin';
import News from './components/Main.News';
import RecommendUsers from './components/Main.RecommendUsers';

const Main = () => {
  return (
    <article>
      <News />
      <RecommendUsers />
    </article>
  );
};

export default withLoginTrue(Main);
