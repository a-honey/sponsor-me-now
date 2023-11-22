import useImgChange from '@/hooks/useImgChange';
import styles from '../styles/MyPage.ImgHeader.module.scss';
import user_none from '@/assets/user_none.png';
import { usePutUserBackground, usePutUserProfile } from '@/hooks/useMutations';
import handleImgUrl from '@/utils/handleImgUrl';

const ImgHeader = ({
  data,
}: {
  data: { profileImg: string; backgroundImg: string };
}) => {
  const putMutation = usePutUserBackground();

  const handleClick = (img: File) => {
    const body = new FormData();
    body.append('profileBackgroundImage', img);
    putMutation.mutate(body);
  };

  const { handleImgChange, imgRef } = useImgChange(handleClick);

  return (
    <div className={styles.container}>
      <img
        ref={imgRef}
        src={
          data?.backgroundImg ? handleImgUrl(data.backgroundImg) : '/logos.png'
        }
        alt="hi"
      />
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
      <ProfileImg src={data?.profileImg} />
    </div>
  );
};

export default ImgHeader;

const ProfileImg = ({ src }: { src: string }) => {
  const putMutation = usePutUserProfile();

  const handleClick = (img: File) => {
    const body = new FormData();
    body.append('profileImage', img);
    putMutation.mutate(body);
  };

  const { handleImgChange, imgRef } = useImgChange(handleClick);

  return (
    <div className={styles.profileImgContainer}>
      <div className={styles.imgContainer}>
        <img ref={imgRef} src={src ? handleImgUrl(src) : user_none} alt="hi" />
      </div>
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
    </div>
  );
};
