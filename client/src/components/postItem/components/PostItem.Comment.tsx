import styles from '../PostItem.module.scss';

const Comment = () => {
  return (
    <>
      <div className={styles.commentContainer}>
        <CommentItem />
      </div>
      <CommentAdd />
    </>
  );
};

export default Comment;

const CommentItem = () => {
  return (
    <div className={styles.commentItemContainer}>
      <div>
        <div>댓글내용</div>
      </div>
      <div>
        L <input />
        <button className={styles.green}>추가</button>
      </div>
    </div>
  );
};

const CommentAdd = () => {
  return (
    <form className={styles.commentAddContainer}>
      <input />
      <button className={styles.green}>추가</button>
    </form>
  );
};
