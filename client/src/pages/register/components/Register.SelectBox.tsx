import React from 'react';
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
        <div
          style={{
            background: "url('/logos.png')",
            width: '200px',
            height: '200px',
            backgroundPosition: '0px 0px',
          }}
        />
        <div>후원하기</div>
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
        <div
          style={{
            background: "url('/logos.png')",
            width: '200px',
            height: '200px',
            backgroundPosition: '-200px 0px',
          }}
        />
        <div>후원받기</div>
      </div>
    </div>
  );
};

export default SelectBox;
