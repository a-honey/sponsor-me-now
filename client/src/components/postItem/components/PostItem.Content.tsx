import styles from '../PostItem.module.scss';

const Content = () => {
  return (
    <div className={styles.contentContainer}>
      <h2>제목</h2>
      <h3>날짜</h3>
      <h3>작성자 정보</h3>
      <div>내용</div>
    </div>
  );
};

export default Content;
