/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled';
import { useQuery, useQueryClient } from 'react-query';
import { Editor } from '@toast-ui/react-editor';
import authAtom from '@/recoil/auth/authAtom';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import Article from '@/pages/boardDetail/components/Article';
import Answer from '@/pages/boardDetail/components/Answer';
import { getArticleById, getArticleViewById } from '@/lib/articleApi';
import useToken from '@/hooks/useToken';
import { postComment } from '@/lib/commentApi';
import { ICommentProps } from '@/interfaces/interface';

export default function BoardDetail() {
  const queryClient = useQueryClient();
  const auth = useRecoilValue(authAtom);
  const editor = React.useRef<Editor>(null);
  const [query] = useSearchParams();
  const articleId = query.get('id');
  const [toggleAnswerBox, setToggleAnswerBox] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [views, setViews] = React.useState<number>(0);
  const { authInfo } = useToken();
  const { data, isError } = useQuery<any>(['boardDetail', articleId], () => getArticleById(articleId as string), {
    enabled: !!articleId,
    select: (fetchData) => ({ article: fetchData.articleInfo, comments: fetchData.commentList }),
    refetchInterval: 30000,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      window.scrollTo(0, 0);
    }, 300);
    getArticleViewById(articleId as string).then(setViews);
  }, []);
  const handleAnswer = React.useCallback(async (articleType: string) => {
    try {
      const content = editor.current?.getInstance().getMarkdown();
      const postParams = { commentType: articleType, content };
      await postComment(authInfo!.token, articleId as string, postParams);
      queryClient.invalidateQueries();
      editor.current?.getInstance().setMarkdown('');
    } catch (e: any) {
      alert('문제가 발생했습니다. 다시  시도해주세요:(');
    }
  }, []);

  return (
    <styles.Container>
      {data && typeof data.article !== 'undefined' && (
        <Article
          article={data.article}
          comments={data.comments}
          views={views}
        />
      )}
      { data && typeof data.article !== 'undefined' && (data.comments.length > 0 || auth) && (
        <styles.AnswerSection>
          {data && data.comments.map((comment:ICommentProps) => !isVisible && (
          <Answer
            key={comment._id}
            comment={comment}
            setToggleAnswerBox={setToggleAnswerBox}
            toggleAnswerBox={toggleAnswerBox}
            article={data.article}
          />
          ))}
            {!toggleAnswerBox && auth && auth?.role !== 'guest' && (
              <styles.AnswerBox>
                <styles.InfoHead>
                  <styles.InfoHeadBox>
                    <styles.ProfileBox>
                      <styles.Profile>{ `${auth?.userName}님 답변해 주세요` }</styles.Profile>
                    </styles.ProfileBox>
                  </styles.InfoHeadBox>
                </styles.InfoHead>
                <styles.Main>
                  <MarkdownEditor isVisible={isVisible} ref={editor} />
                </styles.Main>
                <styles.SubInfo>
                  <Button onClick={() => handleAnswer(data.article.articleType)}>답변하기</Button>
                </styles.SubInfo>
              </styles.AnswerBox>
            )}
        </styles.AnswerSection>
      )}
      {
        (!articleId || isError || (data && typeof data.article === 'undefined'))
        && (<styles.EmptyField>일치하는 게시글이 없습니다.</styles.EmptyField>)
      }
    </styles.Container>
  );
}
