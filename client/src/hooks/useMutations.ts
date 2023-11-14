import postLogin from '@/api/post/postLogin';
import postRegister from '@/api/post/postRegister';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostRegisterData = () => {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      navigator('/main');
    },
  });
};

export const usePostLoginData = () => {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      navigator('/main');
    },
  });
};
