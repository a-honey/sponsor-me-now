import { useGetPostList } from '@/hooks/useQueries';
import PostItem from '../../../components/common/PostItem';
import styles from '../styles/Main.News.module.scss';

const News = () => {
  const { data: postData } = useGetPostList({
    page: 1,
    limit: 7,
    search: 'all',
  });

  return (
    <div className={styles.container}>
      {postData?.posts?.map((item) => (
        <PostItem data={item} />
      ))}
    </div>
  );
};

export default News;
