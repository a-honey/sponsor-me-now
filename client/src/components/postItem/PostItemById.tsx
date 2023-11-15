import styles from './PostItem.module.scss';
import Comment from './components/PostItem.Comment';
import Content from './components/PostItem.Content';

const PostItemById = ({
  toggleIsOpenPost,
}: {
  toggleIsOpenPost: () => void;
}) => {
  console.log('게시글인데용');
  return (
    <div className={styles.container}>
      <Content />
      <Comment />
      <button className={styles.gray} type="button" onClick={toggleIsOpenPost}>
        닫기
      </button>
    </div>
  );
};

export default PostItemById;
