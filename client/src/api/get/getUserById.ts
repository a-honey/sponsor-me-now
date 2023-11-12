import axios from 'axios';

const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`/user?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('getUserById 에러', error);
    throw error;
  }
};

export default getUserById;
