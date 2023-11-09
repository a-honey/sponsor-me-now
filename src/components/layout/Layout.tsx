import Header from './components/Layout.Header';
import LeftBox from './components/Layout.LeftBox';
import RightBox from './components/Layout.RightBox';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main>
      <LeftBox />
      <section>
        <Header />
        <Outlet />
      </section>
      <RightBox />
    </main>
  );
};

export default Layout;
