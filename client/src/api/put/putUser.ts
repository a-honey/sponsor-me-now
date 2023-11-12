import axios from 'axios';

export interface UserPutBodyType {
  username?: string;
  nickname?: string;
  field?: string;
  description?: string;
  isSponsor?: boolean;
}

const putUser = async (userData: UserPutBodyType) => {
  try {
    const response = await axios.put('/user', userData);
    return response.data;
  } catch (error) {
    console.error('putUser 에러', error);
    throw error;
  }
};

export default putUser;
