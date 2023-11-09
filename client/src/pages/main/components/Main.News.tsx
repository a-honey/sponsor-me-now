import PostItem from '../../../components/common/PostItem';
import styles from '../styles/Main.News.module.scss';

const News = () => {
  return (
    <div className={styles.container}>
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
