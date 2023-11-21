import handleImgUrl from '@/utils/handleImgUrl';
import styles from '../styles/UserId.ImgHeader.module.scss';
import UserImg from '@/components/components/UserImg';

const ImgHeader = ({
  data,
}: {
  data: { profileImg: string; backgroundImg: string };
}) => {
  return (
    <div className={styles.container}>
      <img
        src={
          data?.backgroundImg ? handleImgUrl(data.backgroundImg) : '/logos.png'
        }
        alt="배경이미지"
      />
      <div className={styles.imgContainer}>
        <UserImg src={data.profileImg} />
      </div>
    </div>
  );
};

export default ImgHeader;
