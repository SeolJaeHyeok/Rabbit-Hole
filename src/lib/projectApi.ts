import * as interfaces from '@interfaces/interface';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

/*
전체 프로젝트 조회
params: filter, page, perPage
*/
export const getAllProjects = (params: interfaces.IProjectGetParamsProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/projects?${par}`)
    .then((res) => res.json());
};

// TODO - 개별 프로젝트 조회
// export const getProjectById = (projectId: string) => fetch(`${BASE_URL}/projects/${articleId}`)
//   .then((res) => res.json());

// 프로젝트 작성
export const postProject = (token: string, bodyData: interfaces.IProjectPostParamsProps) => fetch(`${BASE_URL}/projects`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// 프로젝트 수정
export const updateProjectById = (token: string, projectId: string, bodyData: interfaces.IProjectPutParamsProps) => fetch(`${BASE_URL}/projects?=${projectId}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// 프로젝트 삭제
export const deleteProjectById = (token: string, projectId: string) => fetch(`${BASE_URL}/projects/${projectId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 프로젝트 좋아요
// TODO - Redis 연결 후 구현

// export const increaseProjectLikes = (token: string, projectId: string) => fetch(`${BASE_URL}/${projectId}/heart`, {
//   method: 'PUT',
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
// }).then((res) => res.json());