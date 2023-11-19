import React from 'react';
import InputBox from './components/Login.InputBox';
import OauthBox from './components/Login.OauthBox';

const Login = () => {
  return (
    <article>
      <h2>로그인</h2>
      <InputBox />
      <OauthBox />
    </article>
  );
};

export default Login;
