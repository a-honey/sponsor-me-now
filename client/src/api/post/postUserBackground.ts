import { fileInstance } from '../instance';

const postUserBackground = async (body: FormData) => {
  try {
    const response = await fileInstance.post('/upload/background', body);
    return response.data;
  } catch (error) {
    console.error('postUserBackground 에러:', error);
    throw error;
  }
};

export default postUserBackground;
