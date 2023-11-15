import styles from '../PostItem.module.scss';

const Comment = () => {
  return (
    <div className={styles.commentContainer}>
      <div>댓글내용</div>
      <button>답글</button>
    </div>
  );
};

export default Comment;
