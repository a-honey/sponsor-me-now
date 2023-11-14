import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Layout.Nav.module.scss';
import { useEffect } from 'react';

const Nav = ({ toggleIsOpenNav }: { toggleIsOpenNav: () => void }) => {
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toggleIsOpenNav();
  }, [location.pathname, toggleIsOpenNav]);
  return (
    <nav className={styles.nav}>
      <button className={styles.cancel} onClick={toggleIsOpenNav}>
        X
      </button>
      <div className={styles.links}>
        <Link to="/main">Home</Link>
        <Link to="/hub">Hub</Link>
        <Link to="/list">My Sponsor</Link>
        <Link to="/mypage">My Page</Link>
        <Link to="/payment">Payment History</Link>
      </div>
      <div>
        <button
          onClick={() => {
            toggleIsOpenNav();
            navigator('/');
          }}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
