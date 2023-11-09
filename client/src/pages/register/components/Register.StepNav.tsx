import styles from '../styles/Register.StepNav.module.scss';

const StepNav = ({
  registerStep,
  handleRegisterStep,
}: {
  registerStep: number;
  handleRegisterStep: (num: number) => void;
}) => {
  return (
    <nav className={styles.stepNav}>
      <div
        className={registerStep >= 1 ? styles.active : ''}
        onClick={() => {
          handleRegisterStep(1);
        }}
      >
        1
      </div>
      <div
        className={registerStep >= 2 ? styles.active : ''}
        onClick={() => {
          handleRegisterStep(2);
        }}
      >
        2
      </div>
      <div
        className={registerStep === 3 ? styles.active : ''}
        onClick={() => {
          handleRegisterStep(3);
        }}
      >
        3
      </div>
    </nav>
  );
};

export default StepNav;
