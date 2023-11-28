import useImgChange from '@/hooks/useImgChange';
import { usePutUserData, usePutUserProfile } from '@/hooks/useMutations';
import { useLoginStore } from '@/store';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import user_none from '@/assets/user_none.png';

const MoreBox = () => {
  const { loginId } = useLoginStore();
  const navigator = useNavigate();

  const putMutation = usePutUserData({ userId: loginId! });
  const putImageMutation = usePutUserProfile();

  const { register, handleSubmit } = useForm<{
    username: string;
    field: string;
    description: string;
  }>();

  const onSubmit = (data: {
    username?: string;
    field?: string;
    description?: string;
  }) => {
    putMutation.mutate(data);
    navigator('/main');
  };

  const handleClick = (img: File) => {
    const body = new FormData();
    body.append('profileImage', img);
    putImageMutation.mutate(body);
  };

  const { handleImgChange, imgRef } = useImgChange(handleClick);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>프로필이미지</label>
      <img width={200} height={200} ref={imgRef} src={user_none} alt="hi" />
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
      <label>분야</label>
      <input type="text" {...register('field')} />
      <label>자기소개 입력</label>
      <input type="text" {...register('description')} />
      <button>정보 저장</button>
      <div className="notice">
        <Link to="/main">건너뛰기</Link>
      </div>
    </form>
  );
};

export default MoreBox;
