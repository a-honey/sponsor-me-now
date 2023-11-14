import { fileInstance } from '../instance';

const postUserProfile = async (img: File) => {
  try {
    const response = await fileInstance.post('/upload/profile', img);
    return response.data;
  } catch (error) {
    console.error('postUserProfile 에러:', error);
    throw error;
  }
};

export default postUserProfile;
