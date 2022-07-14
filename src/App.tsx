import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import Register from '@pages/auth/register';
import Layout from '@pages/layout';
import Token from '@pages/auth/token';
import Chat from '@pages/chat';

import useModal from '@hooks/useModal';
import useToken from '@hooks/useToken';

const Home = lazy(() => import('@pages/home/home'));
const Board = lazy(() => import('@pages/board'));
const Mentoring = lazy(() => import('@pages/mentoring'));
const Projects = lazy(() => import('@/pages/projects/projects'));
const Mypage = lazy(() => import('@pages/mypage'));
const BoardDetail = lazy(() => import('@pages/boardDetail/boardDetail'));

function App() {
  const [getModalPage] = useModal();
  const { authInfo } = useToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        <Route path="/github/register" element={<Register />} />
        <Route path="/github/login" element={<Token />} />
      </Routes>
      {getModalPage()}
      {authInfo && <Chat />}
    </BrowserRouter>
  );
}

export default App;
