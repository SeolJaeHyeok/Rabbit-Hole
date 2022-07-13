import React from 'react';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Logo from '@/components/logo';
import Button from '@/components/button';
import { AiFillGithub } from 'react-icons/ai';
import { getUserLogin } from '@/lib/api';

const Container = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default function Login() {
  const setModalState = useSetRecoilState(modalAtom);
  const handler = () => {
    const width = 700;
    const height = 750;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = 'Github Login';
    setModalState(null);
    window.open(getUserLogin, title, `width=${width},height=${height},left=${left},top=${top}`);
  };
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>
        로그인
      </h1>
      <Logo />
      <h2>
        여러분들의 궁금증을 해결하세요!
      </h2>
      <div style={{ width: '90%' }}>
        <Button size="large" fullSize onClick={handler}>
          <AiFillGithub style={{ fontSize: '3rem', marginRight: '2rem' }} />
          {' '}
          Github 계정으로 로그인
        </Button>
      </div>
    </Container>
  );
}
