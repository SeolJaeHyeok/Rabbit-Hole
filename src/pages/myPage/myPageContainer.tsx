/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { getArticleByUserId, getMyPage, getProjectByUserId } from '@/lib/userApi';
import useToken from '@/hooks/useToken';
import { useQuery } from 'react-query';
import MyPageBoard from './components/MyPageBoard';
import MyPageProjects from './components/MyPageProjects';
import MyPageProfile from './components/MyPageProfile';

interface IMyPageTypeProps {
  [index: string] : any;
  type: string;
}

/*
  TODO
  - [O] type으로 관련 정보 불러오기 -> 개인정보, 프로젝트, 게시글 순으로 진행
  - [O] 개인정보수정 완료
  - [ ] 프로젝트 관리
  - [ ] 게시글 관리
*/

function MyPageContainer({ type }: IMyPageTypeProps): any {
  const { authInfo } = useToken();
  const [articlePage, setArticlePage] = useState<number>(0);
  const [articlePerPage, setArticlePerPage] = useState<number>(5);
  const [projectPage, setProjectPage] = useState<number>(0);
  const [projectPerPage, setProjectPerPage] = useState<number>(5);

  // 페이지네이션 params
  const articleParams = { page: articlePage + 1, perPage: articlePerPage };
  const projectParams = { page: String(projectPage + 1), perPage: String(projectPerPage) };

  // Data Fetching - 각 컴포넌트 별 요구 데이터를 한 곳에서 관리
  const { data: profileData } = useQuery(['mypage', 'proflie'], () => getMyPage(authInfo!.token), {
    staleTime: 180000,
  });
  const { data: projectsData, refetch: projectRefetch } = useQuery(['mypage', 'projects'], () => getProjectByUserId(authInfo!.token, authInfo!.userId, projectParams));

  const { data: articleData, refetch: articleRefetch } = useQuery(['mypage', 'article'], () => getArticleByUserId(authInfo!.token, authInfo!.userId, articleParams));

  // 페이지네이션의 경우 데이터 refetch 실행
  useEffect(() => {
    if (type === 'articles') articleRefetch();
    else if (type === 'projects') projectRefetch();
  }, [articlePage, articlePerPage, projectPage, projectPerPage]);

  // mypage 내에서 type에 맞는 component 보여주기
  switch (type) {
    case 'profile':
      return profileData && <MyPageProfile data={profileData} />;
    case 'articles':
      return articleData && <MyPageBoard page={articlePage} perPage={articlePerPage} setPage={setArticlePage} setPerPage={setArticlePerPage} data={articleData} />;
    case 'projects':
      return projectsData && <MyPageProjects setPage={setProjectPage} setPerPage={setProjectPerPage} data={projectsData} />;
    default:
      return <div>Default</div>;
  }
}

export default MyPageContainer;
