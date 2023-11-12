import { Link } from 'react-router-dom';

const MoreBox = () => {
  return (
    <form className="form">
      <label>분야</label>
      <input />
      <label>자기소개 입력</label>
      <input />
      <label>프로필이미지</label>
      <input />
      <button>정보 저장</button>
      <div className="notice">
        <Link to="/main">건너뛰기</Link>
      </div>
    </form>
  );
};

export default MoreBox;
