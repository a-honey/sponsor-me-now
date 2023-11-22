import { useState, useEffect } from 'react';
import styles from '../styles/MyPage.UserHeader.module.scss';
import { RiEdit2Line, RiSave3Line } from 'react-icons/ri';
import { RxTrash } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useDeleteUser, usePutUserData } from '@/hooks/useMutations';
import { UserPutBodyType } from '@/api/put/putUser';
import { useLoginStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const UserHeader = ({
  toggleIsWritingPost,
  data,
}: {
  data: any;
  toggleIsWritingPost: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { loginId } = useLoginStore();
  const navigator = useNavigate();

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
    if (data) {
      setValue('username', data.username);
      setValue('field', data.field);
      setValue('description', data.description);
    }
  }, [data, setValue]);

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
            <div>{data?.username}</div>
          )}
        </div>
        <div className={styles.item}>
          <label>분야</label>
          {isEditing ? (
            <input type="text" {...register('field')} />
          ) : (
            <div>{data?.field}</div>
          )}
        </div>
        <div className={styles.item}>
          <label>소개</label>
          {isEditing ? (
            <textarea {...register('description')} />
          ) : (
            <div>{data?.description}</div>
          )}
        </div>
      </div>
      <button onClick={toggleIsWritingPost}>게시글 작성하기</button>
      <button onClick={() => navigator('/calculate')}>정산하기</button>
    </div>
  );
};

export default UserHeader;
