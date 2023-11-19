import useImgChange from '@/hooks/useImgChange';
import styles from '../styles/MyPage.ImgHeader.module.scss';
import user_none from '@/assets/user_none.png';
import { usePutUserBackground, usePutUserProfile } from '@/hooks/useMutations';

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
          'http://3.35.118.28:5000/images/img_06da1e2c-8310-46d9-a1f9-e165a17e3eca.jpeg' ??
          '/logos.png'
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
      <img ref={imgRef} src={src ?? user_none} alt="hi" />
      <input type="file" onChange={handleImgChange} onDrag={handleImgChange} />
    </div>
  );
};
