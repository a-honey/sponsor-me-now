import { useLoginStore } from 'store';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigator = useNavigate();
  const { setLoginId, setLoginUsername, setToken } = useLoginStore();

  const handleLogout = () => {
    setLoginId(null);
    setLoginUsername(null);
    setToken(null);
    navigator('/');
  };

  return handleLogout;
};

export default useLogout;
