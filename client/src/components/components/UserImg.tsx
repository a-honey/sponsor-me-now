import user_none from '@/assets/user_none.png';

const UserImg = ({ src }: { src?: string }) => {
  return <img src={src ?? user_none} alt="" />;
};

export default UserImg;
