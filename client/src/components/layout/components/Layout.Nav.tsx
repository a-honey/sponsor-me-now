import { Link } from 'react-router-dom';
import styles from '../styles/Layout.Nav.module.scss';

const Nav = ({ toggleIsOpenNav }: { toggleIsOpenNav: () => void }) => {
  return (
    <nav className={styles.nav}>
      <button className={styles.cancel} onClick={toggleIsOpenNav}>
        X
      </button>
      <div className={styles.links}>
        <Link to="/main">Home</Link>
        <Link to="/hub">Hub</Link>
        <Link to="/list">My Sponsor</Link>
        <Link to="/payment">Payment History</Link>
      </div>
      <div>
        <button>logout</button>
      </div>
    </nav>
  );
};

export default Nav;
