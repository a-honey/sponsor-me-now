import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>main</div>} />
        <Route path="/login" element={<div>login</div>} />
        <Route path="/register" element={<div>register</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
