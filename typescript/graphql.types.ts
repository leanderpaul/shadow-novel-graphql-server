import { genres } from '../data/index';
import GenreEnum = genres;
import { tags } from '../data/index';
import TagEnum = tags;
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './server.types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<Partial<TResult>> | Partial<TResult>;

export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export const Role = {
  User: 'USER',
  NovelAdmin: 'NOVEL_ADMIN'
} as const;

export type Role = typeof Role[keyof typeof Role];
export const SortDirection = {
  Asc: 1,
  Desc: -1
} as const;

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];
export type Operation = {
  __typename?: 'Operation';
  status: Scalars['Boolean'];
  msg: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export { GenreEnum };

export { TagEnum };

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  novels?: Maybe<NovelPagination>;
  novel?: Maybe<Novel>;
};

export type QueryNovelsArgs = {
  filter?: Maybe<NovelFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<NovelSort>;
};

export type QueryNovelArgs = {
  nid: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<UserOrError>;
  register?: Maybe<UserOrError>;
  verifyUser?: Maybe<UserOrError>;
  createNovel?: Maybe<NovelOrError>;
  createVolume?: Maybe<NovelOrError>;
  createChapter?: Maybe<ChapterOrError>;
  updateNovel?: Maybe<NovelOrError>;
  updateVolume?: Maybe<NovelOrError>;
  updateChapter?: Maybe<ChapterOrError>;
  deleteNovel?: Maybe<Operation>;
  deleteVolume?: Maybe<NovelOrError>;
  deleteChapter?: Maybe<NovelOrError>;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};

export type MutationCreateNovelArgs = {
  novel: NovelInput;
};

export type MutationCreateVolumeArgs = {
  nid: Scalars['ID'];
  volume?: Maybe<VolumeInput>;
};

export type MutationCreateChapterArgs = {
  nid: Scalars['ID'];
  vid: Scalars['ID'];
  chapter: ChapterInput;
};

export type MutationUpdateNovelArgs = {
  nid: Scalars['ID'];
  update: NovelInput;
};

export type MutationUpdateVolumeArgs = {
  nid: Scalars['ID'];
  vid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MutationUpdateChapterArgs = {
  nid: Scalars['ID'];
  cid: Scalars['ID'];
  update: ChapterInput;
};

export type MutationDeleteNovelArgs = {
  nid: Scalars['ID'];
};

export type MutationDeleteVolumeArgs = {
  nid: Scalars['ID'];
  vid: Scalars['ID'];
};

export type MutationDeleteChapterArgs = {
  nid: Scalars['ID'];
  cid: Scalars['ID'];
};

export type UserOrError = User | Error;

export type User = {
  __typename?: 'User';
  uid: Scalars['ID'];
  username: Scalars['String'];
  token: Scalars['String'];
  novels: NovelPagination;
};

export type UserNovelsArgs = {
  title?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<NovelSort>;
};

export type NovelPagination = {
  __typename?: 'NovelPagination';
  entries: Array<Novel>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type ChapterPagination = {
  __typename?: 'ChapterPagination';
  entries: Array<Chapter>;
  offset: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Novel = {
  __typename?: 'Novel';
  nid: Scalars['ID'];
  cover?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  author: Scalars['String'];
  desc: Scalars['String'];
  status: StatusEnum;
  genre: GenreEnum;
  tags: Array<TagEnum>;
  views: Scalars['Int'];
  volumes: Array<Volume>;
  createdAt: Scalars['Date'];
  chapter?: Maybe<Chapter>;
  chapters?: Maybe<ChapterPagination>;
};

export type NovelChapterArgs = {
  cid: Scalars['ID'];
};

export type NovelChaptersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
};

export type Volume = {
  __typename?: 'Volume';
  vid: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  chapters?: Maybe<ChapterPagination>;
};

export type VolumeChaptersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
};

export type Chapter = {
  __typename?: 'Chapter';
  cid: Scalars['ID'];
  nid: Scalars['ID'];
  vid: Scalars['ID'];
  index: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
  matureContent: Scalars['Boolean'];
  createdAt: Scalars['Date'];
};

export type NovelOrError = Novel | Error;

export type ChapterOrError = Chapter | Error;

export type NovelFilter = {
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  genre?: Maybe<GenreEnum>;
};

export type NovelSort = {
  field: NovelSortBy;
  order: SortDirection;
};

export type NovelInput = {
  cover?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  desc: Scalars['String'];
  status: StatusEnum;
  genre: GenreEnum;
  tags: Array<TagEnum>;
};

export type ChapterInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  matureContent: Scalars['Boolean'];
};

export type VolumeInput = {
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
};

export const NovelSortBy = {
  Title: 'TITLE',
  Views: 'VIEWS',
  CreatedAt: 'CREATED_AT',
  ChapterCount: 'CHAPTER_COUNT'
} as const;

export type NovelSortBy = typeof NovelSortBy[keyof typeof NovelSortBy];
export const StatusEnum = {
  Completed: 'COMPLETED',
  Ongoing: 'ONGOING'
} as const;

export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Role: Role;
  SortDirection: SortDirection;
  Operation: ResolverTypeWrapper<Operation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Error: ResolverTypeWrapper<Error>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  GenreEnum: genres;
  TagEnum: tags;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  UserOrError: ResolversTypes['User'] | ResolversTypes['Error'];
  User: ResolverTypeWrapper<User>;
  NovelPagination: ResolverTypeWrapper<NovelPagination>;
  ChapterPagination: ResolverTypeWrapper<ChapterPagination>;
  Novel: ResolverTypeWrapper<Novel>;
  Volume: ResolverTypeWrapper<Volume>;
  Chapter: ResolverTypeWrapper<Chapter>;
  NovelOrError: ResolversTypes['Novel'] | ResolversTypes['Error'];
  ChapterOrError: ResolversTypes['Chapter'] | ResolversTypes['Error'];
  NovelFilter: NovelFilter;
  NovelSort: NovelSort;
  NovelInput: NovelInput;
  ChapterInput: ChapterInput;
  VolumeInput: VolumeInput;
  NovelSortBy: NovelSortBy;
  StatusEnum: StatusEnum;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Operation: Operation;
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  Error: Error;
  Date: Scalars['Date'];
  Query: {};
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  Mutation: {};
  UserOrError: ResolversParentTypes['User'] | ResolversParentTypes['Error'];
  User: User;
  NovelPagination: NovelPagination;
  ChapterPagination: ChapterPagination;
  Novel: Novel;
  Volume: Volume;
  Chapter: Chapter;
  NovelOrError: ResolversParentTypes['Novel'] | ResolversParentTypes['Error'];
  ChapterOrError: ResolversParentTypes['Chapter'] | ResolversParentTypes['Error'];
  NovelFilter: NovelFilter;
  NovelSort: NovelSort;
  NovelInput: NovelInput;
  ChapterInput: ChapterInput;
  VolumeInput: VolumeInput;
}>;

export type IamDirectiveArgs = { requires?: Maybe<Role> };

export type IamDirectiveResolver<Result, Parent, ContextType = Context, Args = IamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SortDirectionResolvers = { ASC: 1; DESC: -1 };

export type OperationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Operation'] = ResolversParentTypes['Operation']> = ResolversObject<{
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenreEnumResolvers = EnumResolverSignature<
  { CONTEMPORARY_ROMANCE?: any; FANTASY?: any; FANTASY_ROMANCE?: any; MAGICAL_REALISM?: any; SCI__FI?: any; XIANXIA?: any },
  ResolversTypes['GenreEnum']
>;

export type TagEnumResolvers = EnumResolverSignature<
  {
    ACTION?: any;
    ADULT?: any;
    ADVENTURE?: any;
    COMEDY?: any;
    DRAMA?: any;
    ECCHI?: any;
    FANTASY?: any;
    FEMALE_PROTAGONIST?: any;
    GENDER_BENDER?: any;
    HAREM?: any;
    HISTORICAL?: any;
    HORROR?: any;
    JOSEI?: any;
    MALE_PROTAGONIST?: any;
    MARTIAL_ARTS?: any;
    MATURE?: any;
    MECHA?: any;
    MYSTERY?: any;
    PSYCHOLOGICAL?: any;
    ROMANCE?: any;
    R__18?: any;
    SCHOOL_LIFE?: any;
    SCI__FI?: any;
    SEINEN?: any;
    SHOUJO?: any;
    SHOUJO_AI?: any;
    SHOUNEN?: any;
    SHOUNEN_AI?: any;
    SLICE_OF_LIFE?: any;
    SMUT?: any;
    SPORTS?: any;
    SUPERNATURAL?: any;
    TRAGEDY?: any;
    WUXIA?: any;
    XIANXIA?: any;
    XUANHUAN?: any;
    YAOI?: any;
    YURI?: any;
  },
  ResolversTypes['TagEnum']
>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  novels?: Resolver<Maybe<ResolversTypes['NovelPagination']>, ParentType, ContextType, RequireFields<QueryNovelsArgs, 'filter' | 'limit' | 'offset'>>;
  novel?: Resolver<Maybe<ResolversTypes['Novel']>, ParentType, ContextType, RequireFields<QueryNovelArgs, 'nid'>>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['UserOrError']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
  register?: Resolver<Maybe<ResolversTypes['UserOrError']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'username' | 'password'>>;
  verifyUser?: Resolver<Maybe<ResolversTypes['UserOrError']>, ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
  createNovel?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationCreateNovelArgs, 'novel'>>;
  createVolume?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationCreateVolumeArgs, 'nid' | 'volume'>>;
  createChapter?: Resolver<Maybe<ResolversTypes['ChapterOrError']>, ParentType, ContextType, RequireFields<MutationCreateChapterArgs, 'nid' | 'vid' | 'chapter'>>;
  updateNovel?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationUpdateNovelArgs, 'nid' | 'update'>>;
  updateVolume?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationUpdateVolumeArgs, 'nid' | 'vid'>>;
  updateChapter?: Resolver<Maybe<ResolversTypes['ChapterOrError']>, ParentType, ContextType, RequireFields<MutationUpdateChapterArgs, 'nid' | 'cid' | 'update'>>;
  deleteNovel?: Resolver<Maybe<ResolversTypes['Operation']>, ParentType, ContextType, RequireFields<MutationDeleteNovelArgs, 'nid'>>;
  deleteVolume?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationDeleteVolumeArgs, 'nid' | 'vid'>>;
  deleteChapter?: Resolver<Maybe<ResolversTypes['NovelOrError']>, ParentType, ContextType, RequireFields<MutationDeleteChapterArgs, 'nid' | 'cid'>>;
}>;

export type UserOrErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserOrError'] = ResolversParentTypes['UserOrError']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'Error', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  novels?: Resolver<ResolversTypes['NovelPagination'], ParentType, ContextType, RequireFields<UserNovelsArgs, 'title' | 'limit' | 'offset'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NovelPaginationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NovelPagination'] = ResolversParentTypes['NovelPagination']> = ResolversObject<{
  entries?: Resolver<Array<ResolversTypes['Novel']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChapterPaginationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChapterPagination'] = ResolversParentTypes['ChapterPagination']> = ResolversObject<{
  entries?: Resolver<Array<ResolversTypes['Chapter']>, ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NovelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Novel'] = ResolversParentTypes['Novel']> = ResolversObject<{
  nid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['GenreEnum'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['TagEnum']>, ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volumes?: Resolver<Array<ResolversTypes['Volume']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  chapter?: Resolver<Maybe<ResolversTypes['Chapter']>, ParentType, ContextType, RequireFields<NovelChapterArgs, 'cid'>>;
  chapters?: Resolver<Maybe<ResolversTypes['ChapterPagination']>, ParentType, ContextType, RequireFields<NovelChaptersArgs, 'offset'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VolumeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Volume'] = ResolversParentTypes['Volume']> = ResolversObject<{
  vid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chapters?: Resolver<Maybe<ResolversTypes['ChapterPagination']>, ParentType, ContextType, RequireFields<VolumeChaptersArgs, 'offset'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChapterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Chapter'] = ResolversParentTypes['Chapter']> = ResolversObject<{
  cid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matureContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NovelOrErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NovelOrError'] = ResolversParentTypes['NovelOrError']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Novel' | 'Error', ParentType, ContextType>;
}>;

export type ChapterOrErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChapterOrError'] = ResolversParentTypes['ChapterOrError']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Chapter' | 'Error', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  SortDirection?: SortDirectionResolvers;
  Operation?: OperationResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GenreEnum?: GenreEnumResolvers;
  TagEnum?: TagEnumResolvers;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  UserOrError?: UserOrErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  NovelPagination?: NovelPaginationResolvers<ContextType>;
  ChapterPagination?: ChapterPaginationResolvers<ContextType>;
  Novel?: NovelResolvers<ContextType>;
  Volume?: VolumeResolvers<ContextType>;
  Chapter?: ChapterResolvers<ContextType>;
  NovelOrError?: NovelOrErrorResolvers<ContextType>;
  ChapterOrError?: ChapterOrErrorResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  iam?: IamDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;
