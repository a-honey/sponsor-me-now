import { Link } from 'react-router-dom';
import styles from '../styles/Layout.Nav.module.scss';

const Nav = ({ toggleIsOpenNav }: { toggleIsOpenNav: () => void }) => {
  return (
    <nav className={styles.nav}>
      <button onClick={toggleIsOpenNav}>X</button>
      <Link to="/main">Home</Link>
      <Link to="/hub">Hub</Link>
      <Link to="/list">My Sponsor</Link>
      <Link to="/payment">Payment History</Link>
    </nav>
  );
};

export default Nav;
