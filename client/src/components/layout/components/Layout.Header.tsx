import { useState } from 'react';
import styles from '../styles/Layout.Header.module.scss';
import { RxHamburgerMenu, RxBell } from 'react-icons/rx';
import Nav from './Layout.Nav';
import { Link, useLocation } from 'react-router-dom';
import useLogout from '@/hooks/useLogout';

export const PATHNAME_LIST = [
  { to: '/main', name: 'home' },
  { to: '/hub', name: 'hub' },
  { to: '/list', name: 'my sponsor' },
  { to: '/mypage', name: 'my page' },
  { to: '/payment', name: 'payment history' },
];
const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const handleLogout = useLogout();
  const location = useLocation();

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
          {PATHNAME_LIST.map((item) => (
            <Link
              to={item.to}
              className={location.pathname === item.to ? styles.active : ''}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles.icons}>
          <RxBell>알림</RxBell>
          <RxHamburgerMenu onClick={toggleIsOpenNav}>목록</RxHamburgerMenu>
        </div>
        <div className={styles.pcIcons}>
          <div onClick={handleLogout}>로그아웃</div>
        </div>
      </header>
      {isOpenNav && <Nav toggleIsOpenNav={toggleIsOpenNav} />}
    </>
  );
};

export default Header;
