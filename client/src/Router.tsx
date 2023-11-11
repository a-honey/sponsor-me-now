import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserId from './pages/userId/UserId';
import Payment from './pages/payment/Payment';
import Main from './pages/main/Main';
import Hub from './pages/hub/Hub';
import List from './pages/list/List';
import Intro from './pages/intro/Intro';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/list" element={<List />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user/:id" element={<UserId />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
