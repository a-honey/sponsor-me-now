import postLogin from '@/api/post/postLogin';
import postRegister from '@/api/post/postRegister';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@/store';
import putUser from '@/api/put/putUser';
import { useQueryClient } from '@tanstack/react-query';

export const usePostRegisterData = () => {
  const navigator = useNavigate();
  const { setLoginId, setLoginUsername, setToken } = useLoginStore();

  return useMutation({
    mutationFn: postRegister,
    onSuccess: (res) => {
      setLoginId(res.id);
      setLoginUsername(res.username);
      setToken(res.token);
      navigator('/main');
      return;
    },
  });
};

export const usePostLoginData = () => {
  const navigator = useNavigate();
  const { setLoginId, setLoginUsername, setToken } = useLoginStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      setLoginId(res.id);
      setLoginUsername(res.username);
      setToken(res.token);
      navigator('/main');
      return;
    },
    onError: (error) => {
      alert(error);
    },
  });
};

export const usePutUserData = ({ userId }: { userId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userId', userId.toString()],
      });
    },
  });
};
