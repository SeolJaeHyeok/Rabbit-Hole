/* eslint-disable no-underscore-dangle */
import React, {
  MouseEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Button from '@/components/button';
import Search from '@/components/search';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import useToken from '@/hooks/useToken';
import SelectBox from '@/components/selectBox';

import modalAtom from '@/recoil/modal/modalAtom';
import { IProjectGetParamsProps, IProjectProps } from '@/interfaces/interface';
import { getAllProjects } from '@/lib/projectApi';

const ProjectContainer = styled.div`
  padding: 3rem;
`;

const Alignments = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  margin: 1rem 0;
`;

const Alignment = styled.li`
  vertical-align: middle;
  margin-left: 2rem;
  list-style-type: disc;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 26px;
  cursor: pointer;

  &[selected],
  &:hover{
    font-weight: 700;
    color: ${({ theme }) => theme.palette.eliceViolet};
  }  
`;

const ProjectHeader = styled.div`
  font-size: 2.5rem;
  margin: 2rem 0rem;
  border-bottom: 1px solid black;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  right: 20%;
  top: -10%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0%;
  top: -10%;
  min-height: 45px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  right: 0;
  & select {
    text-align: center;
    height: 3.5rem;
    border: 1.5px solid ${({ theme }) => theme.palette.borderGray}
  }
`;

export default function Projects() {
  const setModal = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();
  const sortRef = useRef<HTMLLIElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputType, setInputType] = useState<string>('title');
  const [perPage, setPerPage] = useState<string>('8');
  const [query, setQuery] = useState<IProjectGetParamsProps>({
    filter: 'date', page: '1', perPage: '8',
  });

  // Modal Control
  const handleProjectEnrollment = useCallback((modalType: any) => {
    setModal(modalType);
  }, []);

  // 프로젝트 정렬
  const handleSort = useCallback((e: MouseEvent<HTMLLIElement>, sortType: string) => {
    if (sortRef.current) {
      sortRef.current.removeAttribute('selected');
    }
    sortRef.current = e.target as HTMLLIElement;
    sortRef.current.setAttribute('selected', '');

    searchParams.set('filter', sortType);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  // 페이지당 프로젝트 수 설정
  const handlePerPage = useCallback((perP: string) => {
    searchParams.set('perPage', perP);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  // 페이지 변화에 따른 URL 변경
  const handleNavigate = useCallback((pageNumber: number) => {
    searchParams.set('page', `${pageNumber + 1}`);
    setSearchParams(searchParams);
  }, []);

  const { data, refetch } = useQuery(['projectList', query], () => getAllProjects(query), {
    suspense: true,
  });

  useEffect(() => {
    searchParams.forEach((v, k) => setQuery((q) => ({ ...q, [k]: v })));
    refetch();
  }, [searchParams]);

  return (
    <ProjectContainer>
      <ProjectHeader>
        프로젝트 갤러리
        <SearchContainer>
          <Search projectQuery={query} setInputType={setInputType} />
        </SearchContainer>
        {authInfo?.token && (
        <ButtonContainer>
          <Button size="small" onClick={() => handleProjectEnrollment('ProjectRegister')}>프로젝트 등록</Button>
        </ButtonContainer>
        )}
      </ProjectHeader>
      <Alignments>
        <Alignment onClick={(e) => handleSort(e, 'date')}>최신순</Alignment>
        <Alignment onClick={(e) => handleSort(e, 'views')}>조회순</Alignment>
        <SelectBoxWrapper className="selectbox-perpage">
          <SelectBox options={['4', '8', '12', '16']} defaultValue="페이지당 개수" selectedOption={perPage} setSelectedOption={setPerPage} requestFunc={handlePerPage} width={70} type="register" />
        </SelectBoxWrapper>
      </Alignments>
      <Content>
        {(data.projectList).map((project: IProjectProps) => (
          <Card
            key={project._id}
            projectId={project._id}
            title={project.title}
            author={project.author}
            shortDescription={project.shortDescription}
            description={project.description}
            thumbnail={project.thumbnail}
            likes={project.likes.length}
            tags={project.tags}
            date={project.createdAt}
            views={project.views}
            type="project"
          />
        ))}
      </Content>
      <PaginationContainer>
        <Pagination
          length={data.totalPage}
          start={query.page ? +(query.page) - 1 : 0}
          handler={(pageNumber) => handleNavigate(pageNumber)}
        />
      </PaginationContainer>
    </ProjectContainer>
  );
}
