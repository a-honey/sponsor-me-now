import { useForm } from 'react-hook-form';
import styles from '../styles/MyPage.PostWrite.module.scss';
import { PostBodyType } from '@/api/post/postPost';
import { usePostPost } from '@/hooks/useMutations';

const PostWrite = ({
  toggleIsWritingPost,
}: {
  toggleIsWritingPost: () => void;
}) => {
  const { register, handleSubmit } = useForm<PostBodyType>();
  const postMutation = usePostPost({ fn: toggleIsWritingPost });

  const onSubmit = (data: PostBodyType) => {
    postMutation.mutate(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2>게시글 작성하기</h2>
      <div>
        <label>제목</label>
        <input {...register('title')} />
      </div>
      <div>
        <label>내용</label>
        <textarea rows={40} {...register('content')} />
      </div>
      <button className={styles.green} type="submit">
        업로드
      </button>
      <button
        className={styles.gray}
        type="button"
        onClick={toggleIsWritingPost}
      >
        작성 취소
      </button>
    </form>
  );
};

export default PostWrite;
