import { fileInstance } from '../instance';

const postUserProfile = async (body: FormData) => {
  try {
    const response = await fileInstance.post('/upload/profile', body);
    return response.data;
  } catch (error) {
    console.error('postUserProfile 에러:', error);
    throw error;
  }
};

export default postUserProfile;
