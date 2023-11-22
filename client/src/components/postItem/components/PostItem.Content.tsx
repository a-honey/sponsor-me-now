import { ResponsePostByIdType } from '@/api/get/getPostById';
import styles from '../PostItem.module.scss';
import { usePostLike } from '@/hooks/useMutations';
import { GoHeartFill, GoHeart } from 'react-icons/go';
const Content = ({ data }: { data: ResponsePostByIdType }) => {
  const { id, title, content, createdAt, likeCount } = data;

  const postMutation = usePostLike();

  const handleLikeClick = () => {
    postMutation.mutate(id);
  };
  return (
    <div className={styles.contentContainer}>
      <h2>{title}</h2>
      <div onClick={handleLikeClick} className={styles.like}>
        {likeCount === 0 ? <GoHeart /> : <GoHeartFill />}
        {likeCount}
      </div>
      <h3>{createdAt}</h3>
      <h3>작성자 정보</h3>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default Content;
