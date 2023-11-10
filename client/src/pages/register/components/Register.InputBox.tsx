import postRegister, { RegisterBodyType } from '@/api/post/postRegister';
import { useForm } from 'react-hook-form';

const InputBox = ({ isSponsor }: { isSponsor: boolean }) => {
  const { register, handleSubmit } = useForm<RegisterBodyType>();

  const onSubmit = (data: RegisterBodyType) => {
    postRegister({ ...data, isSponsor });
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
      <label>이름</label>
      <input type="text" {...register('username')} />
      <label>아이디</label>
      <input type="text" {...register('email')} />
      <label>비밀번호</label>
      <input type="password" {...register('password')} />
      <label>비밀번호 확인</label>
      <input type="password" {...register('passwordConfirm')} />
      <button type="submit">Register</button>
    </form>
  );
};

export default InputBox;
