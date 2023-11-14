import { fileInstance } from '../instance';

const postUserBackground = async (img: File) => {
  try {
    const response = await fileInstance.post('/upload/background', img);
    return response.data;
  } catch (error) {
    console.error('postUserBackground 에러:', error);
    throw error;
  }
};

export default postUserBackground;
