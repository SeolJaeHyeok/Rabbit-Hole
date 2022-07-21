/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useState, KeyboardEvent, useRef,
} from 'react';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { postProject } from '@/lib/projectApi';

import useToken from '@/hooks/useToken';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';
import MarkdownEditor from '@components/markdownEditor';
import Button from '@components/button';
import TagsInput from '@components/tagsInput';
import { IProjectPostParamsProps } from '@/interfaces/interface';

const ModalTitle = styled.h1`
  text-align: center;
`;

const ErrorMessage = styled.span`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const ProjectInfomationForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TagContainer = styled.div`
  margin: 1rem 0;
`;

const InputTitle = styled.h3`
  font-weight: bold;
`;

const ProjectInput = styled.input`
  width: 100%;
  height: 2rem;
  margin: 1rem 0rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
  padding-left: 0.5rem;
`;

const EditorContainer = styled.div`
  width: 60rem;
`;

const ProjectImageInput = styled.input`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0rem;
  border-radius: 5px;
`;

interface IForm extends IProjectPostParamsProps {
  tags: any;
}

function ProjectForm() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<IForm>();
  const [tags, setTags] = useState<{name: string}[]>([]);
  const setModal = useSetRecoilState(modalAtom);
  const editorRef = useRef<Editor>(null);
  const { authInfo } = useToken();

  // Tag 입력하고 Enter 시 Form Submit 방지
  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // FormData POST 요청
  const onValid = async (data: IForm) => {
    const formData: IForm = {
      ...data,
      thumbnail: data.thumbnail[0],
      description: editorRef.current?.getInstance().getMarkdown(),
      tags: JSON.stringify(tags),
    };

    const fd: any = new FormData();

    for (const key in formData) {
      fd.append(key, formData[key]);
    }

    if (authInfo?.token) {
      const response = await postProject(authInfo.token, fd);

      if (response.status >= 400) {
        alert('프로젝트 등록에 실패하였습니다. 다시 시도해주세요:(');
      }
      setModal(null);
    }

    window.location.reload();
  };

  return (
    <>
      <ModalTitle>프로젝트 등록</ModalTitle>
      <ProjectInfomationForm encType="multipart/form-data" onKeyDown={handleEnterSubmit}>
        <InputTitle>Title(필수)</InputTitle>
        <ProjectInput
          {...register('title', {
            required: '제목은 필수 입력사항입니다:)',
            maxLength: {
              value: 50,
              message: '제목은 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <InputTitle>작성자 또는 팀명(필수)</InputTitle>
        <ProjectInput
          {...register('author', {
            required: '작성자 또는 팀명은 필수 입력사항입니다:)',
            maxLength: {
              value: 20,
              message: '작성자 또는 팀명은 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.author?.message}</ErrorMessage>
        <InputTitle>한 줄 소개(필수)</InputTitle>
        <ProjectInput
          {...register('shortDescription', {
            required: '한 줄 소개는 필수 입력사항입니다:)',
            maxLength: {
              value: 50,
              message: '한 줄 소개는 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.shortDescription?.message}</ErrorMessage>
        <InputTitle>태그(선택)</InputTitle>
        <TagContainer>
          <TagsInput tags={tags} setTags={setTags} />
        </TagContainer>
        <EditorContainer style={{ marginBottom: '1rem' }}>
          <InputTitle style={{ marginBottom: '1rem' }}>본문(필수)</InputTitle>
          <MarkdownEditor ref={editorRef} />
        </EditorContainer>
        <InputTitle style={{ margin: '1rem 0' }}>프로젝트 이미지(필수)</InputTitle>
        <ProjectImageInput
          {...register('thumbnail', {
            required: '프로젝트 사진은 필수 입력사항입니다:)',
          })}
          type="file"
        />
        <ErrorMessage>{errors?.thumbnail?.message}</ErrorMessage>
        <Button fullSize onClick={handleSubmit(onValid)}>등록하기</Button>
      </ProjectInfomationForm>
    </>
  );
}

export default ProjectForm;
