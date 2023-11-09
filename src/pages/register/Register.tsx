import { useState } from 'react';
import InputBox from './components/Register.InputBox';
import SelectBox from './components/Register.SelectBox';
import MoreBox from './components/Register.MoreBox';

const Register = () => {
  const [isSponsor, setIsSponsor] = useState<boolean | undefined>(undefined);
  const [registerStep, setRegisterStep] = useState(1);

  const handleIsSponsor = (isSponsorArg: boolean) => {
    setIsSponsor(isSponsorArg);
  };

  const handleNextRegisterStep = () => {
    setRegisterStep((prev) => prev + 1);
  };

  let currentStepComponent;

  switch (registerStep) {
    case 1:
      currentStepComponent = (
        <SelectBox
          isSponsor={isSponsor}
          handleNextRegisterStep={handleNextRegisterStep}
          handleIsSponsor={handleIsSponsor}
        />
      );
      break;
    case 2:
      currentStepComponent = <InputBox isSponsor={isSponsor} />;
      break;
    case 3:
      currentStepComponent = <MoreBox />;
      break;
    default:
      currentStepComponent = null;
  }

  return <>{currentStepComponent}</>;
};

export default Register;
