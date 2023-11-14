import { useForm } from 'react-hook-form';
import styles from '../styles/MyPage.PostWrite.module.scss';
import { PostBodyType } from '@/api/post/postPost';
import { usePostPost } from '@/hooks/useMutations';

const PostWrite = () => {
  const { register, handleSubmit } = useForm<PostBodyType>();
  const postMutation = usePostPost();

  const onSubmit = (data: PostBodyType) => {
    postMutation.mutate(data);
  };

  return (
    <form
      className={styles.container}
      onSubmit={() => {
        handleSubmit(onSubmit);
      }}
    >
      <div>
        <label>제목</label>
        <input {...register('title')} />
      </div>
      <div>
        <label>내용</label>
        <textarea {...register('content')} />
      </div>
    </form>
  );
};

export default PostWrite;
