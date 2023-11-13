import { instance } from '../instance';

interface LoginBodyType {
  email: string;
  password: string;
}
const postLogin = async (userData: LoginBodyType) => {
  try {
    const response = await instance.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error;
  }
};

export default postLogin;
