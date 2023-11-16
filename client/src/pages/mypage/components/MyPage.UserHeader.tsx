import { useState, useEffect } from 'react';
import styles from '../styles/MyPage.UserHeader.module.scss';
import { RiEdit2Line, RiSave3Line } from 'react-icons/ri';
import { RxTrash } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useDeleteUser, usePutUserData } from '@/hooks/useMutations';
import { UserPutBodyType } from '@/api/put/putUser';
import { useGetUserById } from '@/hooks/useQueries';
import { useLoginStore } from '@/store';

const UserHeader = ({
  toggleIsWritingPost,
}: {
  toggleIsWritingPost: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { loginId } = useLoginStore();
  const { data: userData, isFetched } = useGetUserById({ userId: loginId! });

  const putMutation = usePutUserData({ userId: loginId! });
  const deleteMutation = useDeleteUser();

  const { register, handleSubmit, setValue } = useForm<{
    username: string;
    field: string;
    description: string;
  }>();

  const onClick = (data: UserPutBodyType) => {
    putMutation.mutate(data);
  };

  const handleDeleteBtnClick = () => {
    const confirmDelete = window.confirm('탈퇴하시겠습니까?');
    if (confirmDelete) {
      deleteMutation.mutate();
    }
  };

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username);
      setValue('field', userData.field);
      setValue('description', userData.description);
    }
  }, [userData, setValue]);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        {isEditing ? (
          <div
            className={styles.icon}
            onClick={() => {
              handleSubmit((data) => {
                onClick(data);
                setIsEditing(false);
              })();
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
        <div className={styles.icon} onClick={handleDeleteBtnClick}>
          <RxTrash />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.item}>
          <label>이름</label>
          {isEditing ? (
            <input type="text" {...register('username')} />
          ) : (
            <div>{userData.username}</div>
          )}
        </div>
        <div className={styles.item}>
          <label>분야</label>
          {isEditing ? (
            <input type="text" {...register('field')} />
          ) : (
            <div>{userData.field}</div>
          )}
        </div>
        <div className={styles.item}>
          <label>소개</label>
          {isEditing ? (
            <textarea {...register('description')} />
          ) : (
            <div>{userData.description}</div>
          )}
        </div>
      </div>
      <button onClick={toggleIsWritingPost}>게시글 작성하기</button>
    </div>
  );
};

export default UserHeader;
