import React from 'react';
import UserItem from '../../components/common/UserItem';
import { useGetUserList } from '../../hooks/useQueries';

const Hub = () => {
  const { data } = useGetUserList({ page: 1, limit: 10, search: 'all' });

  return (
    <article>
      <h2>모든 게시글 및 후원대상자 매칭</h2>
      {data?.users.map((item) => (
        <UserItem data={item} />
      ))}
    </article>
  );
};

export default Hub;
