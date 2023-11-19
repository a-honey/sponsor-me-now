import React from 'react';
import Header from './components/Layout.Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main>
      <section>
        <Header />
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
