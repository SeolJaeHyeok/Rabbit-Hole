/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import Table from '@/components/table';
import Loading from '@/components/loading';
import * as interfaces from '@interfaces/interface';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllUsers } from '@/lib/adminApi';
import useToken from '@/hooks/useToken';

export default function AdminUser() {
  const { authInfo } = useToken();
  const [query] = useSearchParams();
  const page = query.get('page');
  const perPage = query.get('perPage');
  const queryParams = page && perPage ? { page, perPage } : { page: '1', perPage: '10' };
  const { data } = useQuery(['admin', 'users'], async () => {
    let res;
    if (authInfo) {
      res = await getAllUsers(authInfo.token, queryParams);
    }
    return res;
  });
  console.log(data);

  const clickHandler = (item) => {
    console.log(item);
  };
  return (data && (
    <>
      <h1>유저 관리</h1>
    </>
  )
  );
}
