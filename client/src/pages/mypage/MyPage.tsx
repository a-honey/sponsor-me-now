import React, { useState } from 'react';
import withLoginTrue from '../../components/withLogin';
import ImgHeader from './components/MyPage.ImgHeader';
import UserHeader from './components/MyPage.UserHeader';
import PostWrite from './components/MyPage.PostWrite';

const MyPage = () => {
  const [isWritingPost, setIsWritingPost] = useState(false);
  const toggleIsWritingPost = () => {
    setIsWritingPost((prev) => !prev);
  };
  return (
    <article>
      <ImgHeader />
      <UserHeader toggleIsWritingPost={toggleIsWritingPost} />
      {isWritingPost && <PostWrite toggleIsWritingPost={toggleIsWritingPost} />}
    </article>
  );
};

export default withLoginTrue(MyPage);
