import axios from 'axios';

interface LoginBodyType {
  email: string;
  password: string;
}
const postLogin = async (userData: LoginBodyType) => {
  try {
    const response = await axios.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error;
  }
};

export default postLogin;
