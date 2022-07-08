import React, { MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '@components/logo';
import Search from '@components/search';

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
  
  & div:first-child {
    margin-right: 5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;

  & :focus {
    color: ${(props) => props.theme.palette.eliceViolet}
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  padding: 1.6rem;

  font-weight: 600;
  font-size: 1.8rem;

  & + & {
    margin-left: 2rem;
  }
  &.active {
    color: ${(props) => props.theme.palette.eliceViolet}
  }
  :hover {
    background-color: #f9fafc
  }
`;

export default function Header() {
  const anchorRef = useRef<HTMLAnchorElement>();

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

  return (
    <StyledHeader onClick={handleClick}>
      <Link to="/">
        <Logo width={210} heigth={74} />
      </Link>
      <Nav>
        <StyledLink to="/board">게시판</StyledLink>
        <StyledLink to="/mentoring">멘토/멘티</StyledLink>
        <StyledLink to="/projects">프로젝트 갤러리</StyledLink>
      </Nav>
      <HeaderRight>
        <Search />
        <Buttons>
          <StyledLink to="/login">로그인</StyledLink>
          <StyledLink to="/register">회원가입</StyledLink>
        </Buttons>
      </HeaderRight>
    </StyledHeader>
  );
}
