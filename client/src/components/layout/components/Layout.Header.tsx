import { useState } from 'react';
import styles from '../styles/Layout.Header.module.scss';
import { RxHamburgerMenu, RxBell } from 'react-icons/rx';
import Nav from './Layout.Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggleIsOpenNav = () => {
    setIsOpenNav((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>Sponsor Me Now</div>
        </div>
        <div className={styles.links}>
          <Link to="/main">Home</Link>
          <Link to="/hub">Hub</Link>
          <Link to="/list">My Sponsor</Link>
          <Link to="/mypage">My Page</Link>
          <Link to="/payment">Payment History</Link>
        </div>
        <div className={styles.icons}>
          <RxBell>알림</RxBell>
          <RxHamburgerMenu onClick={toggleIsOpenNav}>목록</RxHamburgerMenu>
        </div>
        <div className={styles.pcIcons}>
          <div>로그아웃</div>
        </div>
      </header>
      {isOpenNav && <Nav toggleIsOpenNav={toggleIsOpenNav} />}
    </>
  );
};

export default Header;
