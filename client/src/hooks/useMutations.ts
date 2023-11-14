import postLogin from '@/api/post/postLogin';
import postRegister from '@/api/post/postRegister';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@/store';
import putUser from '@/api/put/putUser';

export const usePostRegisterData = () => {
  return useMutation({
    mutationFn: postRegister,
    onSuccess: () => {},
  });
};

export const usePostLoginData = () => {
  const navigator = useNavigate();
  const { setLoginId, setLoginUsername } = useLoginStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      setLoginId(res.data.id);
      setLoginUsername(res.data.username);
      navigator('/main');
      return;
    },
  });
};

export const usePutUserData = () => {
  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {},
  });
};
