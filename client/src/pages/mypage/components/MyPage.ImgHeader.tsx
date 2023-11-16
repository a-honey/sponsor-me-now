import useImgChange from '@/hooks/useImgChange';
import styles from '../styles/MyPage.ImgHeader.module.scss';
import user_none from '@/assets/user_none.png';
import { usePutUserBackground, usePutUserProfile } from '@/hooks/useMutations';

const ImgHeader = () => {
  const putMutation = usePutUserBackground();

  const handleClick = (img: File) => {
    const body = new FormData();
    body.append('profileBackgroundImage', img);
    putMutation.mutate(body);
  };

  const { handleImgChange, imgRef } = useImgChange(handleClick);

  return (
    <div className={styles.container}>
      <img ref={imgRef} src="/logos.png" alt="hi" />
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
      <ProfileImg />
    </div>
  );
};

export default ImgHeader;

const ProfileImg = () => {
  const putMutation = usePutUserProfile();

  const handleClick = (img: File) => {
    const body = new FormData();
    body.append('profileImage', img);
    putMutation.mutate(body);
  };

  const { handleImgChange, imgRef } = useImgChange(handleClick);

  return (
    <div className={styles.profileImgContainer}>
      <img ref={imgRef} src={user_none} alt="hi" />
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
    </div>
  );
};
