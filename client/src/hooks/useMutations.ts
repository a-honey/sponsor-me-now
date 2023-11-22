import postLogin from '@/api/post/postLogin';
import postRegister from '@/api/post/postRegister';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@/store';
import putUser from '@/api/put/putUser';
import { useQueryClient } from '@tanstack/react-query';
import postUserProfile from '@/api/post/postUserProfile';
import postUserBackground from '@/api/post/postUserBackground';
import postPost from '@/api/post/postPost';
import deleteUser from '@/api/delete/deleteUser';
import useLogout from './useLogout';
import postPostLike from '@/api/post/postPostLike';
import postComment from '@/api/post/postComment';

export const usePostRegisterData = (fn: () => void) => {
  const { setLoginId, setLoginUsername, setToken } = useLoginStore();

  return useMutation({
    mutationFn: postRegister,
    onSuccess: (res) => {
      setLoginId(res.id);
      setLoginUsername(res.username);
      setToken(res.token);
      fn();
      return;
    },
  });
};

export const usePostLoginData = () => {
  const navigator = useNavigate();
  const { setLoginId, setLoginUsername, setToken, setLoginEmail } =
    useLoginStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      setLoginId(res.id);
      setLoginUsername(res.username);
      setToken(res.token);
      setLoginEmail(res.email);
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

export const usePutUserProfile = () => {
  const queryClient = useQueryClient();
  const { loginId } = useLoginStore();

  return useMutation({
    mutationFn: postUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userId', loginId?.toString()],
      });
    },
  });
};

export const usePutUserBackground = () => {
  const queryClient = useQueryClient();
  const { loginId } = useLoginStore();

  return useMutation({
    mutationFn: postUserBackground,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userId', loginId?.toString()],
      });
    },
  });
};

export const useDeleteUser = () => {
  const handleLogout = useLogout();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      handleLogout();
    },
  });
};

export const usePostPost = () => {
  return useMutation({
    mutationFn: postPost,
    onSuccess: (res) => {
      console.log(res);
    },
  });
};

export const usePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPostLike,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['postId', res.id.toString()],
      });
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['postId', res.postId.toString()],
      });
    },
  });
};
