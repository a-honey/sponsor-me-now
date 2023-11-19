import React from 'react';
import styles from '../styles/Register.OauthBox.module.scss';

const OauthBox = () => {
  return (
    <div className={styles.container}>
      <div>OR</div>
      <button>카카오 회원가입</button>
    </div>
  );
};

export default OauthBox;
