import { useGetPostById } from '@/hooks/useQueries';
import styles from './PostItem.module.scss';
import Comment from './components/PostItem.Comment';
import Content from './components/PostItem.Content';

const PostItemById = ({
  postId,
  toggleIsOpenPost,
}: {
  postId: number;
  toggleIsOpenPost: () => void;
}) => {
  const { data } = useGetPostById({ postId });

  return (
    <div className={styles.container}>
      <Content data={data} />
      <Comment data={data?.comment} />
      <button className={styles.gray} type="button" onClick={toggleIsOpenPost}>
        닫기
      </button>
    </div>
  );
};

export default PostItemById;
