import React, { MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';
import styled from 'styled-components';
import Logo from '@components/logo';
import Search from '@components/search';

import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 10rem;
  padding: 0 3rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderGray};
  
  color: ${(props) => props.theme.palette.gray};

  line-height: 1.5;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 1 0%;
  height: inherit;
  margin-left: 3rem;
  gap: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  
  & :not(:first-child) {
    margin-left: 2rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;

  & + & {
    margin-left: 2rem;
  }
  &.active {
    color: ${(props) => props.theme.palette.eliceViolet}
  }
  :hover {
    background-color: ${(props) => lighten(0.5, props.theme.palette.eliceViolet)};;
  }
`;

const StyledAuth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;
  cursor: pointer;
  & + & {
    margin-left: 2rem;
  }
`;

export default function Header() {
  const anchorRef = useRef<HTMLAnchorElement>();
  const setModal = useSetRecoilState(modalAtom);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const anchorTarget = target.closest('a') as HTMLAnchorElement;

    if (anchorRef.current) {
      anchorRef.current.classList.remove('active');
    }
    anchorRef.current = anchorTarget;
    anchorRef.current.classList.add('active');
  };

  const handleAuth = (type: '' | 'Login') => {
    setModal(type);
  };

  return (
    <StyledHeader onClick={handleClick}>
      <Link to="/">
        <Logo />
      </Link>
      <Nav>
        <StyledLink to="/board">게시판</StyledLink>
        <StyledLink to="/mentoring">멘토/멘티</StyledLink>
        <StyledLink to="/projects">프로젝트 갤러리</StyledLink>
      </Nav>
      <HeaderRight>
        <Search />
        <StyledAuth onClick={() => handleAuth('Login')}>로그인</StyledAuth>
      </HeaderRight>
    </StyledHeader>
  );
}
