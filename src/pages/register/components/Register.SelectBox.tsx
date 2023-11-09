import styles from '../styles/Register.SelectBox.module.scss';

const SelectBox = ({
  isSponsor,
  handleIsSponsor,
  handleNextRegisterStep,
}: {
  isSponsor: boolean | undefined;
  handleIsSponsor: (isSponsorArg: boolean) => void;
  handleNextRegisterStep: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div
        className={
          isSponsor !== undefined && isSponsor
            ? `${styles.selectBox} ${styles.active}`
            : styles.selectBox
        }
        onClick={() => {
          handleIsSponsor(true);
          handleNextRegisterStep();
        }}
      >
        후원하기
      </div>
      <div
        className={
          isSponsor !== undefined && !isSponsor
            ? `${styles.selectBox} ${styles.active}`
            : styles.selectBox
        }
        onClick={() => {
          handleIsSponsor(false);
          handleNextRegisterStep();
        }}
      >
        후원받기
      </div>
    </div>
  );
};

export default SelectBox;
