// TODO: optional 속성들 맞는지 검토 필요
export interface IUserProps {
    _id: string;
    name: string;
    track: string;
    trackCardinalNumber: number;
    position?: string;
    authImage: string;
    blogAddress?: string;
    githubEmail: string;
    githubProfileUrl: string;
    githubAvatar: string;
    carrots?: number;
    refreshToken: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface ILikesProps {
    userId: string;
}

export interface ITagsProps {
    name: string;
}

export type IArticleTypes = 'question' | 'free' | 'study' | string

export interface IArticleProps {
    _id: string;
    articleType: IArticleTypes;
    author: string;
    authorId: string;
    title: string;
    content: string;
    likes?: ILikesProps[];
    views?: number;
    carrots?: number;
    tags?: ITagsProps[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IArticleGetProps {
    [index: string]: any;
    articleType: IArticleTypes;
    filter?: string;
    page?: string;
    perPage?: string;
}

export interface IArticlePostProps {
    articleType: string;
    author: string;
    title: string;
    content: string;
    carrots: number;
    tags: ITagsProps[] | [];
}

export interface IArticlePutProps {
    title: string;
    content: string;
    tags?: ITagsProps[] | [];
}

export interface ICommentProps {
    _id: string;
    commentType: string;
    author: string;
    articleId: string;
    authorId: string;
    content: string;
    likes: ILikesProps[];
    isAdopted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IPostCommentProps {
    commentType: string;
    articleId: string;
    content: string;
}

export interface IChatProps {
    _id: string;
    roomType: string;
    username: string;
    message: string;
    time: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IProjectProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    views: string;
    tags: ITagsProps[];
    likes: ILikesProps[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IReportProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IMenteesProps {
    userId: string;
    username: string;
}

export interface IMentoringProps {
    _id: string;
    title: string;
    mentor: string;
    mentorId: string;
    mentees?: IMenteesProps[];
    content: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IRegisterFormProps {
    name: string;
    track: string;
    trackCardinalNumber: string;
    position?: string;
    blogAddress?: string;
    authImage: string;
    githubEmail: string;
    githubProfileUrl: string;
    githubAvatar: string;
}

export interface ISearchArticleByAuthorProps {
    [index: string]: string;
    author: string;
    type: IArticleTypes;
}

export interface ISearchArticleByTitleProps {
    [index: string]: string;
    title: string;
    type: IArticleTypes;
}

export interface IProjectGetParamsProps {
    [index: string]: any;
    filter: string;
    page: number;
    perPage: any;
}

export interface IProjectPostParamsProps {
    author: string;
    title: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    tags: ITagsProps[];
}

export interface IProjectPutParamsProps {
    author: string;
    title: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    tags: ITagsProps[];
}
