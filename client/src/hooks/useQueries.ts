import getUserList from '../api/get/getUserList';
import getUserById from '../api/get/getUserById';
import getPostList from '../api/get/getPostList';
import getPostById from '../api/get/getPostById';
import { useQuery } from '@tanstack/react-query';

export const useGetUserById = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ['userId', userId.toString()],
    queryFn: () => getUserById(userId),
  });
};

export const useGetUserList = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  return useQuery({
    queryKey: ['userList', page.toString(), search],
    queryFn: () => getUserList({ page, limit, search }),
  });
};

export const useGetPostList = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['postList', page.toString(), search],
    queryFn: () => getPostList({ page, limit, search }),
  });
};

export const useGetPostById = ({ postId }: { postId: number }) => {
  return useQuery({
    queryKey: ['postId', postId.toString()],
    queryFn: () => getPostById(postId),
  });
};
