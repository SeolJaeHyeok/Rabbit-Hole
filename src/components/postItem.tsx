import React from 'react';
import styled from 'styled-components';

const defaultProps = {
  type: 'default',
};

type IPostItemProps = {
  profile:string;
  title:string;
  content:string;
  date:string;
  comment:number;
  heart:number;
  articleId: string;
  articleType: string;
  type?: string;
} & typeof defaultProps;

const Post = styled.div<{type: string}>`
  cursor: pointer;
  width: ${(props) => (props.type === 'default' ? '800px' : '400px')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  isolation: isolate;

  border-top: 1px solid ${({ theme }):string => theme.palette.borderGray};
  border-bottom: 1px solid ${({ theme }):string => theme.palette.borderGray};

  & :hover {
    opacity: 80%;
  }
`;

const Main = styled.div<{type: string}>`
  height: ${(props) => (props.type === 'default' ? '170px' : '100px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
`;

const Content = styled.div<{type: string}>`
  height: ${(props) => (props.type === 'default' ? '100px' : '50px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Profile = styled.p<{type: string}>`
  font-size: ${(props) => (props.type === 'default' ? '15px' : '10px')};
  line-height: 16px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color : ${({ theme }):string => theme.palette.gray};
`;

const Title = styled.h3<{type: string}>`
  max-width: ${(props) => (props.type === 'default' ? '700px' : '350px')};
  font-size:  ${(props) => (props.type === 'default' ? '40px' : '15px')};
  font-weight: 700;
  letter-spacing: 0.15px;
  color : ${({ theme }):string => theme.palette.black};

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;

`;

const Body = styled.p<{type: string}>`
  max-width:  ${(props) => (props.type === 'default' ? '700px' : '350px')};
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.25px;
  line-height: 20px;
  color: ${({ theme }):string => theme.palette.gray};

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

const Date = styled.p`
  font-size: 10px;
  letter-spacing: 0.15px;
  color: ${({ theme }):string => theme.palette.gray};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CommentBox = styled.div<{type: string}>`
  width: 60px;
  height: 60px;
  display: ${(props) => (props.type === 'default' ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border-radius: 50px;
  border: 1px solid ${({ theme }):string => theme.palette.borderGray};
`;

const CommentCount = styled.p`
  font-size:  14px;
  font-weight: 400;
  letter-spacing: 1.25px;
  text-align: center;
  vertical-align: middle;
  color: ${({ theme }):string => theme.palette.gray};
`;

const CommentText = styled.p`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.75px;
  color: ${({ theme }):string => theme.palette.gray};
`;

const HeartBox = styled.div<{type: string}>`
  display: ${(props) => (props.type === 'default' ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: ${({ theme }):string => theme.palette.gray};
`;

const HeartCount = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1.25px;
  color: ${({ theme }):string => theme.palette.gray};
`;

export default function PostItem({
  profile,
  title,
  content,
  date,
  comment,
  heart,
  articleId,
  articleType,
  type,
}:IPostItemProps) {
  const clickHandler = ():void => {
    console.log(`게시물 디테일로 이동 : /board?${articleType}=${articleId}`);
  };

  return (
    <Post type={type} onClick={clickHandler}>
      <Main type={type}>
        <Content type={type}>
          <Profile type={type}>{profile}</Profile>
          <Title type={type}>{title}</Title>
          <Body type={type}>{content}</Body>
        </Content>
        <Date>{date}</Date>
      </Main>
      <Info>
        <CommentBox type={type}>
          <CommentCount>{comment}</CommentCount>
          <CommentText>댓글</CommentText>
        </CommentBox>
        <HeartBox type={type}>
          <HeartIcon xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 26 26"><path fill="currentColor" d="M17.869 3.889c-2.096 0-3.887 1.494-4.871 2.524c-.984-1.03-2.771-2.524-4.866-2.524C4.521 3.889 2 6.406 2 10.009c0 3.97 3.131 6.536 6.16 9.018c1.43 1.173 2.91 2.385 4.045 3.729c.191.225.471.355.765.355h.058c.295 0 .574-.131.764-.355c1.137-1.344 2.616-2.557 4.047-3.729C20.867 16.546 24 13.98 24 10.009c0-3.603-2.521-6.12-6.131-6.12z" /></HeartIcon>
          <HeartCount>{heart}</HeartCount>
        </HeartBox>
      </Info>
    </Post>
  );
}

PostItem.defaultProps = defaultProps;
