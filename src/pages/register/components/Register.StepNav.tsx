import styles from '../styles/Register.StepNav.module.scss';

const StepNav = ({
  handleRegisterStep,
}: {
  handleRegisterStep: (num: number) => void;
}) => {
  return (
    <nav className={styles.stepNav}>
      <div
        onClick={() => {
          handleRegisterStep(1);
        }}
      >
        1
      </div>
      <div
        onClick={() => {
          handleRegisterStep(2);
        }}
      >
        2
      </div>
      <div
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
