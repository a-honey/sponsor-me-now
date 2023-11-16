import { ResponsePostByIdType } from '@/api/get/getPostById';
import styles from '../PostItem.module.scss';

const Content = ({ data }: { data: ResponsePostByIdType }) => {
  const { id, title, content, createdAt, likeCount } = data;
  return (
    <div className={styles.contentContainer}>
      <h2>{title}</h2>
      <div>{likeCount}</div>
      <h3>{createdAt}</h3>
      <h3>작성자 정보</h3>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default Content;
