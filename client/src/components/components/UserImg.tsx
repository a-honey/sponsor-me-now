import user_none from '@/assets/user_none.png';
import handleImgUrl from '@/utils/handleImgUrl';

const UserImg = ({ src }: { src?: string | null }) => {
  return <img src={src ? handleImgUrl(src) : user_none} alt="" />;
};

export default UserImg;
