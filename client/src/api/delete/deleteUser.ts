import { instance } from '../instance';

const deleteUser = async () => {
  try {
    const response = await instance.delete(`/user`);
    return response.data;
  } catch (error) {
    console.error('deleteUser 에러', error);
    throw error;
  }
};

export default deleteUser;
