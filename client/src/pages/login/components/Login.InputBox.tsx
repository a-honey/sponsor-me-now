import { useForm } from 'react-hook-form';
import styles from '../styles/Login.InputBox.module.scss';
import { Link } from 'react-router-dom';
interface LoginDataType {
  email: string;
  password: string;
}
const InputBox = () => {
  const { register, handleSubmit } = useForm<LoginDataType>();

  const onSubmit = (data: LoginDataType) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>이메일</label>
      <input type="text" {...register('email')} />
      <label>비밀번호</label>
      <input type="password" {...register('password')} />
      <button type="submit">Login</button>
      <div className={styles.notice}>
        계정이 없으신가요? <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default InputBox;
