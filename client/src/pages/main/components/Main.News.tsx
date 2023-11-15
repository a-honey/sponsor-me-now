import { useGetPostList } from '@/hooks/useQueries';
import PostItem from '../../../components/common/PostItem';
import styles from '../styles/Main.News.module.scss';

const News = () => {
  const { data: postData, isFetched } = useGetPostList({
    page: 1,
    limit: 7,
    search: 'my',
  });

  return (
    <div className={styles.container}>
      {postData?.posts.map((item) => (
        <div>item</div>
      ))}
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
};

export default News;
