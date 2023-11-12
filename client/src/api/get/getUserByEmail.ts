import axios from 'axios';

const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`/user/internal?email=${email}`);
    return response.data;
  } catch (error) {
    console.error('getUserByEmail 에러', error);
    throw error;
  }
};

export default getUserByEmail;
