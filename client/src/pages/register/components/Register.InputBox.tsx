import { useForm } from 'react-hook-form';

interface RegisterDataType {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const InputBox = ({ isSponsor }: { isSponsor: boolean | undefined }) => {
  const { register, handleSubmit } = useForm<RegisterDataType>();

  const onSubmit = (data: RegisterDataType) => {
    console.log({ ...data, isSponsor });
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
