import React from 'react';
import withLoginTrue from '../../components/withLogin';
import UserList from './components/List.UserList';

const List = () => {
  return (
    <article>
      <h2>내가 후원한 사람들</h2>
      <UserList />
    </article>
  );
};

export default withLoginTrue(List);
