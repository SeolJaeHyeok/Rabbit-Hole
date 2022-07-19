/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from '@/components/button';
import { useSetRecoilState } from 'recoil';
import modalAtom from '@/recoil/modal/modalAtom';
import { ModalTypes } from '@/interfaces/type';
import { deleteUser, updateUserProfile } from '@/lib/userApi';
import useToken from '@/hooks/useToken';
import { IUserProps } from '@/interfaces/interface';
import { FaCarrot } from 'react-icons/fa';

const Container = styled.div`
  margin: 6rem 2rem 2rem 6rem;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const InputForm = styled.form`
  width: 80%;
`;

const InputTitle = styled.h2`
  margin: 2rem 0;
`;

const InputValue = styled.input`
  font-size: 1.5rem;
  padding: 0.6rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.lightViolet};
  border-radius: 5px;
`;

const CarrotsInfo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 2rem;
  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: ${({ theme }) => theme.palette.carrotOrange}
  }
`;

const ImageContainer = styled.div``;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 4px 4px 10px ${({ theme }): string => theme.palette.borderGray};
`;

const ButtonConatiner = styled.div`
  margin: 2rem 0;
  display: flex;
  gap: 2rem;
`;

interface IForm {
  name: string;
  track: string;
  trackCardinalNumber: string;
  position: string;
  githubEmail: string;
  githubProfileUrl: string;
}

function MyPageProfile({ data }: {data: IUserProps}) {
  const { authInfo } = useToken();
  const { register, handleSubmit } = useForm<IForm>();
  const setModal = useSetRecoilState(modalAtom);
  const profileImageUrl = localStorage.getItem('imageUrl');

  const onValid = async (formData: IForm) => {
    const response = await updateUserProfile(authInfo!.token, formData);
    const { status } = response;

    if (status !== 200) {
      alert('정보 수정에 오류가 발생했습니다. 다시 시도해주세요:(');
    } else {
      alert('성공적으로 회원정보가 수정되었습니다:)');
    }
    window.location.reload();
  };

  const handleModalOpen = (modalType: ModalTypes) => {
    setModal(modalType);
  };

  const handleUserDelete = () => {
    const url = deleteUser;
    console.log(url);
  };

  return (
    <Container>
      <InputForm>
        <InputTitle>이름</InputTitle>
        <InputValue {...register('name')} defaultValue={data.name} />
        <InputTitle>트랙</InputTitle>
        <InputValue {...register('track')} defaultValue={data.track} />
        <InputTitle>기수</InputTitle>
        <InputValue {...register('trackCardinalNumber')} defaultValue={data.trackCardinalNumber} />
        <InputTitle>희망 포지션</InputTitle>
        <InputValue {...register('position')} defaultValue={data.position} />
        <InputTitle>이메일</InputTitle>
        <InputValue {...register('githubEmail')} defaultValue={data.githubEmail} />
        <InputTitle>깃허브 주소</InputTitle>
        <InputValue {...register('githubProfileUrl')} defaultValue={data.githubProfileUrl} />
        <ButtonConatiner>
          <Button onClick={handleSubmit(onValid)}>정보 수정</Button>
          <Button onClick={handleUserDelete}>회원 탈퇴</Button>
        </ButtonConatiner>
      </InputForm>
      <ImageContainer>
        <ProfileImage src={profileImageUrl || data.githubAvatar} />
        <Button onClick={() => handleModalOpen('ProfileImage')}>Edit</Button>
        <CarrotsInfo>
          <FaCarrot />
          {`: ${authInfo?.carrots}개`}
        </CarrotsInfo>
      </ImageContainer>
    </Container>
  );
}

export default MyPageProfile;
