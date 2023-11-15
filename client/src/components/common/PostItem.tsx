import styles from './index.module.scss';

const PostItem = ({
  data,
}: {
  data: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    viewCount: number;
    postImg: string | null;
  };
}) => {
  const { id, title, createdAt, authorId, viewCount } = data;
  return (
    <div className={styles.postItem}>
      <div className={styles.title}>{title}</div>
      <div>작성자{authorId}</div>
    </div>
  );
};

export default PostItem;
