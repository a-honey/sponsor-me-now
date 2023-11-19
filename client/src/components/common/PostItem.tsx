import React, { useState } from 'react';
import styles from './index.module.scss';
import PostItemById from '../postItem/PostItemById';

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
  const [isOpenPost, setIsOpenPost] = useState(false);
  const { id, title, createdAt, authorId, viewCount } = data;

  const toggleIsOpenPost = () => {
    setIsOpenPost((prev) => !prev);
  };
  return (
    <>
      <div className={styles.postItem} onClick={toggleIsOpenPost}>
        <div className={styles.title}>{title}</div>
        <div>작성자{authorId}</div>
      </div>
      {isOpenPost && (
        <PostItemById postId={id} toggleIsOpenPost={toggleIsOpenPost} />
      )}
    </>
  );
};

export default PostItem;
