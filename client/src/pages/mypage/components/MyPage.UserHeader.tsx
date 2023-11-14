import { useState } from 'react';
import styles from '../styles/MyPage.UserHeader.module.scss';
import { RiEdit2Line, RiSave3Line } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { usePutUserData } from '@/hooks/useMutations';
import { UserPutBodyType } from '@/api/put/putUser';

const UserHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const putMutation = usePutUserData();

  const { register, handleSubmit } = useForm<{
    username: string;
    field: string;
    description: string;
  }>();

  const onClick = (data: UserPutBodyType) => {
    putMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        {isEditing ? (
          <div
            className={styles.icon}
            onClick={() => {
              handleSubmit(onClick);
              setIsEditing(false);
            }}
          >
            <RiSave3Line />
          </div>
        ) : (
          <div
            className={styles.icon}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <RiEdit2Line />
          </div>
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.item}>
          <label>이름</label>
          {isEditing ? (
            <input type="text" {...register('username')} />
          ) : (
            <div>username</div>
          )}
        </div>
        <div className={styles.item}>
          <label>분야</label>
          {isEditing ? (
            <input type="text" {...register('field')} />
          ) : (
            <div>username</div>
          )}
        </div>
        <div className={styles.item}>
          <label>소개</label>
          {isEditing ? (
            <textarea {...register('description')} />
          ) : (
            <div>username</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
