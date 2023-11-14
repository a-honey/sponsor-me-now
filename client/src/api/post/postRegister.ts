import { instance } from '../instance';
import postLogin from './postLogin';
export interface RegisterBodyType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  isSponsor: boolean;
}

const postRegister = async (userData: RegisterBodyType) => {
  try {
    await instance.post('/auth', userData);
    const response = postLogin({
      email: userData.email,
      password: userData.password,
    });
    return response;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export default postRegister;
