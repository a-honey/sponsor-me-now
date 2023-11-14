import { useLoginStore } from '@/store';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withLoginTrue = (InnerComponent: React.FC) => {
  return () => {
    const navigator = useNavigate();
    const { loginId } = useLoginStore();

    useEffect(() => {
      if (!loginId) {
        alert('로그인이 필요합니다.');
        navigator('/login');
      }
    }, [loginId, navigator]);

    return loginId ? <InnerComponent /> : null;
  };
};

export default withLoginTrue;
