import InputBox from './components/Register.InputBox';
import SelectBox from './components/Register.SelectBox';

const Register = () => {
  return (
    <>
      <SelectBox CountType="후원 받기" />
      <SelectBox CountType="후원 하기" />
      <InputBox />
    </>
  );
};

export default Register;
