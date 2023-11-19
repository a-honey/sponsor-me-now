import React from 'react';
import styles from './PostItem.module.scss';
import Comment from './components/PostItem.Comment';
import Content from './components/PostItem.Content';
import { useGetPostById } from 'hooks/useQueries';

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
      {data && (
        <>
          <Content data={data} />
          <Comment />
        </>
      )}
      <button className={styles.gray} type="button" onClick={toggleIsOpenPost}>
        닫기
      </button>
    </div>
  );
};

export default PostItemById;
