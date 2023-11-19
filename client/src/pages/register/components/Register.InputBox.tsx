import React from 'react';
import styles from '../styles/Register.InputBox.module.scss';
import { RegisterBodyType } from '../../../api/post/postRegister';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import OauthBox from './Register.OauthBox';
import { usePostRegisterData } from '../../../hooks/useMutations';

const InputBox = ({ isSponsor }: { isSponsor: boolean }) => {
  const { register, handleSubmit } = useForm<RegisterBodyType>();

  const postRegisterMutation = usePostRegisterData();

  const onSubmit = (data: RegisterBodyType) => {
    postRegisterMutation.mutate({ ...data, isSponsor });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>이름</label>
        <input type="text" {...register('username')} />
        <label>아이디</label>
        <input type="text" {...register('email')} />
        <label>비밀번호</label>
        <input type="password" {...register('password')} />
        <label>비밀번호 확인</label>
        <input type="password" {...register('passwordConfirm')} />
        <button type="submit">Register</button>
        <div className={styles.notice}>
          계정이 이미 있으신가요? <Link to="/register">Register</Link>
        </div>
      </form>
      <OauthBox />
    </>
  );
};

export default InputBox;
