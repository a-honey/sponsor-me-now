import { useState } from 'react';
import { usePostComment } from '@/hooks/useMutations';
import styles from '../PostItem.module.scss';
import { ResponsePostByIdType } from '@/api/get/getPostById';
import UserImg from '@/components/components/UserImg';

const Comment = ({ data }: { data: ResponsePostByIdType }) => {
  const { id, comment } = data;
  return (
    <>
      <div className={styles.commentContainer}>
        {comment.map((item) => (
          <CommentItem data={item} />
        ))}
      </div>
      <CommentAdd postId={id} />
    </>
  );
};

export default Comment;

const CommentItem = ({
  data,
}: {
  data: ResponsePostByIdType['comment'][0];
}) => {
  const [isOpenCommentAdd, setIsOpenCommentAdd] = useState(false);

  const toggleIsOpenCommentAdd = () => {
    setIsOpenCommentAdd((prev) => !prev);
  };

  const { postId, content, author, profileImg, id } = data;
  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.contentContainer}>
        <div>
          {content}
          <span onClick={toggleIsOpenCommentAdd}>+</span>
        </div>
        <div className={styles.authorContainer}>
          <UserImg src={profileImg} />
          <div>{author.username}</div>
        </div>
      </div>
      {isOpenCommentAdd && (
        <CommentAdd
          postId={postId}
          parentId={id}
          parentUsername={author.username}
        />
      )}
    </div>
  );
};

const CommentAdd = ({
  postId,
  parentId,
  parentUsername,
}: {
  postId: number;
  parentId?: number;
  parentUsername?: string;
}) => {
  const [content, setContent] = useState('');
  const postMutation = usePostComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postMutation.mutate(
      parentId ? { postId, content } : { postId, parentId, content },
    );
    setContent('');
  };
  return (
    <form
      className={
        parentId ? styles.commentParentAddContainer : styles.commentAddContainer
      }
      onSubmit={handleSubmit}
    >
      {parentId && 'L'}
      <input
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          parentUsername ? `@${parentUsername}에게 답글을 입력해주세요.` : ''
        }
      />
      <button type="submit" className={styles.green}>
        추가
      </button>
    </form>
  );
};
