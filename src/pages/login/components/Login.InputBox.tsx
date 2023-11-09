import { useForm } from 'react-hook-form';
import styles from '../styles/Login.InputBox.module.scss';
interface LoginDataType {
  username: string;
  password: string;
}
const InputBox = () => {
  const { register, handleSubmit } = useForm<LoginDataType>();

  const onSubmit = (data: LoginDataType) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>아이디</label>
      <input type="text" {...register('username')} />
      <label>비밀번호</label>
      <input type="password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  );
};

export default InputBox;
