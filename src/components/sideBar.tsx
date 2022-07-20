// sideBar
import React, { ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ContentProps{
    id:number,
    name: string,
    path: string,
    selected: boolean,
    icon?: ReactNode,
}

interface SideBarProps{
    type?: 'myPage' | 'board',
    contentsList?: ContentProps[],
}

const Container = styled.aside`
    font-size: 1.6rem;
    min-width: 13rem;
    width: 30rem;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const List = styled.ul`
    width: 80%;
    height: 90%;
    list-style-type: disc;
`;

const BoardItem = styled.li<{selected: boolean}>`
    margin: 2rem auto;
    height: 1.6rem;
    width: 50%;
    cursor: pointer;
    color: ${(props) => (props.selected ? props.theme.palette.eliceViolet : props.theme.palette.gray)};
    &:hover{
        font-size:1.65rem;
        color: ${(props) => props.theme.palette.eliceViolet};
    }
`;

const MyPageItem = styled.li<{selected: boolean}>`
    width: 100%;
    height: 5rem;
    margin: 1rem 0;
    font-size: 1.8rem;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (!props.selected ? props.theme.palette.black : 'white')};
    background-color: ${(props) => (props.selected ? props.theme.palette.eliceViolet : 'white')};
    &:hover{
        background-color: ${(props) => props.theme.palette.eliceViolet};
        color: white;
    }
`;

const defaultProps = {
  type: 'board',
  contentsList: [{
    id: 0,
    name: '콘텐츠 속성이 필요합니다.',
    path: '/',
    selected: false,
  }],
};

// contentList를 동적 생성 이후에 고려
export default function SideBar({ type, contentsList = [] }:SideBarProps) {
  const navigate = useNavigate(); // 라우팅

  const [contents, setContents] = useState<ContentProps[]>(contentsList); // 리스트의 선택 상태 관리
  const [queryString] = useSearchParams();

  useEffect(() => {
    const queryType = type === 'board' ? 'articleType' : 'type';
    const queryStringType = queryString.get(queryType);
    setContents(
      contents.map((content) => (new URLSearchParams(content.path.split('?')[1]).get(queryType) === queryStringType
        ? { ...content, selected: true }
        : { ...content, selected: false })),
    );
  }, [queryString]);

  // 리스트 선택 시 selected상태 변경 및 라우팅
  const itemClickHandler = (event: React.MouseEvent<HTMLLIElement>, id: number, path: string) => {
    setContents(
      contents.map((content) => (content.id === id
        ? { ...content, selected: true }
        : { ...content, selected: false })),
    );
    navigate(path);
  };

  return (
    <Container>
      <List>
        {contents.map(({
          id, name, path, selected, icon,
        }) => {
          let item;
          if (type === 'board') {
            item = (
              <BoardItem // 게시판 리스트
                key={id}
                selected={selected}
                onClick={(e) => {
                  itemClickHandler(e, id, path);
                }}
              >
                {name}
              </BoardItem>
            );
          }
          if (type === 'myPage') {
            item = (
              <MyPageItem // 마이페이지 리스트
                key={id}
                selected={selected}
                onClick={(e) => {
                  itemClickHandler(e, id, path);
                }}
              >
                <div style={{ flex: '1', textAlign: 'center' }}>{icon}</div>
                <div style={{ flex: '2' }}>{name}</div>
              </MyPageItem>
            );
          }
          return item;
        })}
      </List>
    </Container>
  );
}

SideBar.defaultProps = defaultProps;
