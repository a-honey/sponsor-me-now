import styles from './index.module.scss';

const PostItem = () => {
  return (
    <div className={styles.postItem}>
      <div className={styles.title}>title</div>
      <div>content</div>
      <div>작성자프로필&이름</div>
    </div>
  );
};

export default PostItem;
