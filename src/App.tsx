import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Board from '@pages/board';
import Home from '@pages/home';
import Mentoring from '@pages/mentoring';
import Mypage from '@pages/mypage';
import Projects from '@pages/projects';
import Header from '@components/header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/mentoring" element={<Mentoring />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
