import { useState } from 'react';
import styles from '../styles/Layout.Header.module.scss';
import { RxHamburgerMenu, RxBell } from 'react-icons/rx';
import Nav from './Layout.Nav';

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggleIsOpenNav = () => {
    setIsOpenNav((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Sponsor Buy Me</div>
        <div className={styles.icons}>
          <RxBell>알림</RxBell>
          <RxHamburgerMenu onClick={toggleIsOpenNav}>목록</RxHamburgerMenu>
        </div>
      </header>
      {isOpenNav && <Nav toggleIsOpenNav={toggleIsOpenNav} />}
    </>
  );
};

export default Header;
