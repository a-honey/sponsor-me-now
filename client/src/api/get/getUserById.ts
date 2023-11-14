import { instance } from '../instance';

const getUserById = async (id: number) => {
  try {
    const response = await instance.get(`/user?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error('getUserById 에러', error);
    throw error;
  }
};

export default getUserById;
