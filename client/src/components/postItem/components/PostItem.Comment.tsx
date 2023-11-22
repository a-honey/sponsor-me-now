import { useState } from 'react';
import {
  useDeleteComment,
  usePostComment,
  usePutComment,
} from '@/hooks/useMutations';
import styles from '../PostItem.module.scss';
import { ResponsePostByIdType } from '@/api/get/getPostById';
import UserImg from '@/components/components/UserImg';
import { MdDeleteOutline, MdOutlineAddComment } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';

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
  const [isEditingCommentAdd, setIsEditingCommentAdd] = useState(false);

  const { postId, content, author, profileImg, id } = data;

  const [editContent, setEditContent] = useState(content);

  const putMutation = usePutComment();
  const deleteMutation = useDeleteComment();

  const toggleIsOpenCommentAdd = () => {
    setIsOpenCommentAdd((prev) => !prev);
  };

  const toggleIsEditingCommentAdd = () => {
    setIsEditingCommentAdd((prev) => !prev);
  };

  const handleEditClick = () => {
    putMutation.mutate({ commentId: id, content: editContent });
  };

  const handleDeleteClick = () => {
    const ok = window.confirm('댓글을 삭제하시겠습니까?');
    if (ok) {
      deleteMutation.mutate(id);
    }
    return;
  };

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.commentContent}>
          {isEditingCommentAdd ? (
            content
          ) : (
            <input
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            />
          )}
          <div className={styles.icons}>
            <button className="gray" onClick={toggleIsEditingCommentAdd}>
              <GrEdit />
            </button>
            <button
              className="green"
              onClick={
                isEditingCommentAdd ? handleEditClick : toggleIsOpenCommentAdd
              }
            >
              <MdOutlineAddComment />
            </button>
            <button className="red" onClick={handleDeleteClick}>
              <MdDeleteOutline />
            </button>
          </div>
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
