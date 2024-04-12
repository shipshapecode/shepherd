import { Prisma } from "@prisma/client"
import { MergePrismaWithSdlTypes, MakeRelationsOptional } from '@redwoodjs/api'
import { Account as PrismaAccount, Integration as PrismaIntegration, Metric as PrismaMetric, Actor as PrismaActor, Group as PrismaGroup, Journey as PrismaJourney, Step as PrismaStep, User as PrismaUser, UserCredential as PrismaUserCredential } from '@prisma/client'
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
      args?: TArgs,
      obj?: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type OptArgsResolverFn<TResult, TParent = {}, TContext = {}, TArgs = {}> = (
      args?: TArgs,
      obj?: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>

    export type RequiredResolverFn<TResult, TParent = {}, TContext = {}, TArgs = {}> = (
      args: TArgs,
      obj: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Byte: Buffer;
  Date: Date | string;
  DateTime: Date | string;
  JSON: Prisma.JsonValue;
  JSONObject: Prisma.JsonObject;
  Time: Date | string;
};

export type Account = {
  __typename?: 'Account';
  actors: Array<Maybe<Actor>>;
  apiKey: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  journeys: Array<Maybe<Journey>>;
  metrics: Array<Maybe<Metric>>;
  updatedAt: Scalars['DateTime'];
};

export type Actor = {
  __typename?: 'Actor';
  Account: Account;
  accountId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  metrics: Array<Maybe<Metric>>;
  properties?: Maybe<Scalars['JSON']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ActorsByJourneyList = {
  __typename?: 'ActorsByJourneyList';
  actors: Array<Actor>;
  count: Scalars['Int'];
  totalCanceled: Scalars['Int'];
  totalFinished: Scalars['Int'];
};

export type ActorsList = {
  __typename?: 'ActorsList';
  actors: Array<Actor>;
  count: Scalars['Int'];
};

export type CreateAccountInput = {
  apiKey: Scalars['String'];
};

export type CreateActorInput = {
  accountId: Scalars['String'];
  journeyId?: InputMaybe<Scalars['String']>;
};

export type CreateGroupInput = {
  accountId: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  providerId: Scalars['String'];
  values: Scalars['JSON'];
};

export type CreateIntegrationInput = {
  accountId: Scalars['String'];
  name: Scalars['String'];
  option: IntegrationOptions;
  settings: Scalars['JSON'];
};

export type CreateJourneyInput = {
  accountId: Scalars['String'];
  classPrefix?: InputMaybe<Scalars['String']>;
  confirmCancel?: InputMaybe<Scalars['Boolean']>;
  confirmCancelMessage?: InputMaybe<Scalars['String']>;
  exitOnEsc?: InputMaybe<Scalars['Boolean']>;
  keyboardNavigation?: InputMaybe<Scalars['Boolean']>;
  tourName?: InputMaybe<Scalars['String']>;
  uniqueId: Scalars['String'];
  useModalOverlay?: InputMaybe<Scalars['Boolean']>;
};

export type CreateMetricInput = {
  date: Scalars['DateTime'];
  journeyId?: InputMaybe<Scalars['String']>;
  type: MetricTypes;
  value: Scalars['String'];
};

export type CreateUserInput = {
  accountId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  salt: Scalars['String'];
  type: UserTypes;
  webAuthnChallenge?: InputMaybe<Scalars['String']>;
};

export type DemoEmailInput = {
  from: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EmailInput = {
  from?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
};

export type EmailResponse = {
  __typename?: 'EmailResponse';
  from?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  statusId: Scalars['String'];
  subject?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  Account: Account;
  accountId: Scalars['String'];
  actors: Array<Maybe<Actor>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  providerId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  values: Scalars['JSON'];
};

export type Integration = {
  __typename?: 'Integration';
  Account: Account;
  accountId: Scalars['String'];
  cohorts?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  option: IntegrationOptions;
  projectId?: Maybe<Scalars['String']>;
  settings: Scalars['JSON'];
  syncedAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type IntegrationCohort = {
  __typename?: 'IntegrationCohort';
  appId?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  chartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editId?: Maybe<Scalars['String']>;
  finished?: Maybe<Scalars['Boolean']>;
  hidden?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isOfficialContent?: Maybe<Scalars['Boolean']>;
  isPredictive?: Maybe<Scalars['Boolean']>;
  lastComputed?: Maybe<Scalars['DateTime']>;
  lastMod?: Maybe<Scalars['DateTime']>;
  lastViewed?: Maybe<Scalars['DateTime']>;
  locationId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  owners: Array<Maybe<Scalars['String']>>;
  popularity?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  shortcutIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<Scalars['Int']>;
  syncedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
  view_count?: Maybe<Scalars['Int']>;
  viewers: Array<Maybe<Scalars['String']>>;
};

export type IntegrationOptions =
  | 'AMPLITUDE'
  | 'POSTHOG';

export type Journey = {
  __typename?: 'Journey';
  accountId?: Maybe<Scalars['String']>;
  classPrefix?: Maybe<Scalars['String']>;
  confirmCancel: Scalars['Boolean'];
  confirmCancelMessage?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  exitOnEsc: Scalars['Boolean'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  keyboardNavigation: Scalars['Boolean'];
  tourName?: Maybe<Scalars['String']>;
  uniqueId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  useModalOverlay: Scalars['Boolean'];
};

export type JourneyState =
  | 'ACTIVE'
  | 'CANCEL'
  | 'COMPLETE'
  | 'SHOW';

export type Metric = {
  __typename?: 'Metric';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  journeyId?: Maybe<Scalars['String']>;
  journeyState?: Maybe<JourneyState>;
  type: MetricTypes;
  value?: Maybe<Scalars['JSON']>;
};

export type MetricTypes =
  | 'EVENT'
  | 'IDENTIFY';

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createActor: Actor;
  createGroup: Group;
  createIntegration: Integration;
  createJourney: Journey;
  createMetric: Metric;
  createUser: User;
  deleteAccount: Account;
  deleteActor: Actor;
  deleteGroup: Group;
  deleteIntegration: Integration;
  deleteJourney: Journey;
  deleteMetric: Metric;
  deleteUser: User;
  syncIntegrationCohorts: Integration;
  updateAccount: Account;
  updateActor: Actor;
  updateGroup: Group;
  updateIntegration: Integration;
  updateJourney: Journey;
  updateMetric: Metric;
  updateUser: User;
};


export type MutationcreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationcreateActorArgs = {
  input: CreateActorInput;
};


export type MutationcreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationcreateIntegrationArgs = {
  input: CreateIntegrationInput;
};


export type MutationcreateJourneyArgs = {
  input: CreateJourneyInput;
};


export type MutationcreateMetricArgs = {
  input: CreateMetricInput;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationdeleteAccountArgs = {
  id: Scalars['String'];
};


export type MutationdeleteActorArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationdeleteIntegrationArgs = {
  id: Scalars['String'];
};


export type MutationdeleteJourneyArgs = {
  id: Scalars['String'];
};


export type MutationdeleteMetricArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationsyncIntegrationCohortsArgs = {
  id: Scalars['String'];
};


export type MutationupdateAccountArgs = {
  id: Scalars['String'];
  input: UpdateAccountInput;
};


export type MutationupdateActorArgs = {
  id: Scalars['Int'];
  input: UpdateActorInput;
};


export type MutationupdateGroupArgs = {
  id: Scalars['String'];
  input: UpdateGroupInput;
};


export type MutationupdateIntegrationArgs = {
  id: Scalars['String'];
  input: UpdateIntegrationInput;
};


export type MutationupdateJourneyArgs = {
  id: Scalars['String'];
  input: UpdateJourneyInput;
};


export type MutationupdateMetricArgs = {
  id: Scalars['Int'];
  input: UpdateMetricInput;
};


export type MutationupdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};

/** About the Redwood queries. */
export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  actor?: Maybe<Actor>;
  actors: Array<Actor>;
  actorsByJourney: ActorsByJourneyList;
  actorsListPaginated: ActorsList;
  actorsWithMetrics: Array<Actor>;
  group?: Maybe<Group>;
  groups: Array<Group>;
  integration?: Maybe<Integration>;
  integrations: Array<Integration>;
  journey?: Maybe<Journey>;
  journeys: Array<Journey>;
  metric?: Maybe<Metric>;
  metrics: Array<Metric>;
  /** Fetches the Redwood root schema. */
  redwood?: Maybe<Redwood>;
  sendDemoRequest: EmailResponse;
  sendEmail: EmailResponse;
  sendWelcomeEmail: EmailResponse;
  user?: Maybe<User>;
  users: Array<User>;
};


/** About the Redwood queries. */
export type QueryaccountArgs = {
  id: Scalars['String'];
};


/** About the Redwood queries. */
export type QueryactorArgs = {
  id: Scalars['Int'];
};


/** About the Redwood queries. */
export type QueryactorsByJourneyArgs = {
  journeyId: Scalars['String'];
};


/** About the Redwood queries. */
export type QueryactorsListPaginatedArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


/** About the Redwood queries. */
export type QuerygroupArgs = {
  id: Scalars['String'];
};


/** About the Redwood queries. */
export type QueryintegrationArgs = {
  id: Scalars['String'];
};


/** About the Redwood queries. */
export type QueryjourneyArgs = {
  id: Scalars['String'];
};


/** About the Redwood queries. */
export type QuerymetricArgs = {
  id: Scalars['Int'];
};


/** About the Redwood queries. */
export type QuerysendDemoRequestArgs = {
  input: DemoEmailInput;
};


/** About the Redwood queries. */
export type QuerysendEmailArgs = {
  input: EmailInput;
};


/** About the Redwood queries. */
export type QuerysendWelcomeEmailArgs = {
  input: EmailInput;
};


/** About the Redwood queries. */
export type QueryuserArgs = {
  id: Scalars['String'];
};

/**
 * The RedwoodJS Root Schema
 *
 * Defines details about RedwoodJS such as the current user and version information.
 */
export type Redwood = {
  __typename?: 'Redwood';
  /** The current user. */
  currentUser?: Maybe<Scalars['JSON']>;
  /** The version of Prisma. */
  prismaVersion?: Maybe<Scalars['String']>;
  /** The version of Redwood. */
  version?: Maybe<Scalars['String']>;
};

export type UpdateAccountInput = {
  apiKey?: InputMaybe<Scalars['String']>;
};

export type UpdateActorInput = {
  accountId?: InputMaybe<Scalars['String']>;
  journeyId?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupInput = {
  accountId?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  providerId?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Scalars['JSON']>;
};

export type UpdateIntegrationInput = {
  accountId?: InputMaybe<Scalars['String']>;
  cohorts?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  option?: InputMaybe<IntegrationOptions>;
  settings?: InputMaybe<Scalars['JSON']>;
};

export type UpdateJourneyInput = {
  classPrefix?: InputMaybe<Scalars['String']>;
  confirmCancel?: InputMaybe<Scalars['Boolean']>;
  confirmCancelMessage?: InputMaybe<Scalars['String']>;
  exitOnEsc?: InputMaybe<Scalars['Boolean']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  keyboardNavigation?: InputMaybe<Scalars['Boolean']>;
  tourName?: InputMaybe<Scalars['String']>;
  useModalOverlay?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateMetricInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  journeyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MetricTypes>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  accountId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  hashedPassword?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  salt?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserTypes>;
  webAuthnChallenge?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  Account?: Maybe<Account>;
  accountId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiresAt?: Maybe<Scalars['DateTime']>;
  salt: Scalars['String'];
  type: UserTypes;
  webAuthnChallenge?: Maybe<Scalars['String']>;
};

export type UserTypes =
  | 'ADMIN'
  | 'OWNER'
  | 'VIEWER';

type MaybeOrArrayOfMaybe<T> = T | Maybe<T> | Maybe<T>[];
type AllMappedModels = MaybeOrArrayOfMaybe<Account | Actor | Group | Integration | Journey | Metric | User>


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

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

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

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
export type ResolversTypes = {
  Account: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaAccount, MakeRelationsOptional<Account, AllMappedModels>, AllMappedModels>>;
  Actor: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaActor, MakeRelationsOptional<Actor, AllMappedModels>, AllMappedModels>>;
  ActorsByJourneyList: ResolverTypeWrapper<Omit<ActorsByJourneyList, 'actors'> & { actors: Array<ResolversTypes['Actor']> }>;
  ActorsList: ResolverTypeWrapper<Omit<ActorsList, 'actors'> & { actors: Array<ResolversTypes['Actor']> }>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CreateAccountInput: CreateAccountInput;
  CreateActorInput: CreateActorInput;
  CreateGroupInput: CreateGroupInput;
  CreateIntegrationInput: CreateIntegrationInput;
  CreateJourneyInput: CreateJourneyInput;
  CreateMetricInput: CreateMetricInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DemoEmailInput: DemoEmailInput;
  EmailInput: EmailInput;
  EmailResponse: ResolverTypeWrapper<EmailResponse>;
  Group: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaGroup, MakeRelationsOptional<Group, AllMappedModels>, AllMappedModels>>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Integration: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaIntegration, MakeRelationsOptional<Integration, AllMappedModels>, AllMappedModels>>;
  IntegrationCohort: ResolverTypeWrapper<IntegrationCohort>;
  IntegrationOptions: IntegrationOptions;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Journey: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaJourney, MakeRelationsOptional<Journey, AllMappedModels>, AllMappedModels>>;
  JourneyState: JourneyState;
  Metric: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaMetric, MakeRelationsOptional<Metric, AllMappedModels>, AllMappedModels>>;
  MetricTypes: MetricTypes;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateActorInput: UpdateActorInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateIntegrationInput: UpdateIntegrationInput;
  UpdateJourneyInput: UpdateJourneyInput;
  UpdateMetricInput: UpdateMetricInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<MergePrismaWithSdlTypes<PrismaUser, MakeRelationsOptional<User, AllMappedModels>, AllMappedModels>>;
  UserTypes: UserTypes;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: MergePrismaWithSdlTypes<PrismaAccount, MakeRelationsOptional<Account, AllMappedModels>, AllMappedModels>;
  Actor: MergePrismaWithSdlTypes<PrismaActor, MakeRelationsOptional<Actor, AllMappedModels>, AllMappedModels>;
  ActorsByJourneyList: Omit<ActorsByJourneyList, 'actors'> & { actors: Array<ResolversParentTypes['Actor']> };
  ActorsList: Omit<ActorsList, 'actors'> & { actors: Array<ResolversParentTypes['Actor']> };
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  CreateAccountInput: CreateAccountInput;
  CreateActorInput: CreateActorInput;
  CreateGroupInput: CreateGroupInput;
  CreateIntegrationInput: CreateIntegrationInput;
  CreateJourneyInput: CreateJourneyInput;
  CreateMetricInput: CreateMetricInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DemoEmailInput: DemoEmailInput;
  EmailInput: EmailInput;
  EmailResponse: EmailResponse;
  Group: MergePrismaWithSdlTypes<PrismaGroup, MakeRelationsOptional<Group, AllMappedModels>, AllMappedModels>;
  Int: Scalars['Int'];
  Integration: MergePrismaWithSdlTypes<PrismaIntegration, MakeRelationsOptional<Integration, AllMappedModels>, AllMappedModels>;
  IntegrationCohort: IntegrationCohort;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Journey: MergePrismaWithSdlTypes<PrismaJourney, MakeRelationsOptional<Journey, AllMappedModels>, AllMappedModels>;
  Metric: MergePrismaWithSdlTypes<PrismaMetric, MakeRelationsOptional<Metric, AllMappedModels>, AllMappedModels>;
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  String: Scalars['String'];
  Time: Scalars['Time'];
  UpdateAccountInput: UpdateAccountInput;
  UpdateActorInput: UpdateActorInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateIntegrationInput: UpdateIntegrationInput;
  UpdateJourneyInput: UpdateJourneyInput;
  UpdateMetricInput: UpdateMetricInput;
  UpdateUserInput: UpdateUserInput;
  User: MergePrismaWithSdlTypes<PrismaUser, MakeRelationsOptional<User, AllMappedModels>, AllMappedModels>;
};

export type requireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type requireAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = requireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type skipAuthDirectiveArgs = { };

export type skipAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = skipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  actors: OptArgsResolverFn<Array<Maybe<ResolversTypes['Actor']>>, ParentType, ContextType>;
  apiKey: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  journeys: OptArgsResolverFn<Array<Maybe<ResolversTypes['Journey']>>, ParentType, ContextType>;
  metrics: OptArgsResolverFn<Array<Maybe<ResolversTypes['Metric']>>, ParentType, ContextType>;
  updatedAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  actors?: RequiredResolverFn<Array<Maybe<ResolversTypes['Actor']>>, ParentType, ContextType>;
  apiKey?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  journeys?: RequiredResolverFn<Array<Maybe<ResolversTypes['Journey']>>, ParentType, ContextType>;
  metrics?: RequiredResolverFn<Array<Maybe<ResolversTypes['Metric']>>, ParentType, ContextType>;
  updatedAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']> = {
  Account: OptArgsResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  metrics: OptArgsResolverFn<Array<Maybe<ResolversTypes['Metric']>>, ParentType, ContextType>;
  properties: OptArgsResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']> = {
  Account?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  metrics?: RequiredResolverFn<Array<Maybe<ResolversTypes['Metric']>>, ParentType, ContextType>;
  properties?: RequiredResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorsByJourneyListResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ActorsByJourneyList'] = ResolversParentTypes['ActorsByJourneyList']> = {
  actors: OptArgsResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  count: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  totalCanceled: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  totalFinished: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorsByJourneyListRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ActorsByJourneyList'] = ResolversParentTypes['ActorsByJourneyList']> = {
  actors?: RequiredResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  count?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  totalCanceled?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  totalFinished?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorsListResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ActorsList'] = ResolversParentTypes['ActorsList']> = {
  actors: OptArgsResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  count: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorsListRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ActorsList'] = ResolversParentTypes['ActorsList']> = {
  actors?: RequiredResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  count?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EmailResponseResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['EmailResponse'] = ResolversParentTypes['EmailResponse']> = {
  from: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  subject: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailResponseRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['EmailResponse'] = ResolversParentTypes['EmailResponse']> = {
  from?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  subject?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  Account: OptArgsResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  actors: OptArgsResolverFn<Array<Maybe<ResolversTypes['Actor']>>, ParentType, ContextType>;
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  key: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  name: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  providerId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  values: OptArgsResolverFn<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  Account?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  actors?: RequiredResolverFn<Array<Maybe<ResolversTypes['Actor']>>, ParentType, ContextType>;
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  key?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  name?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  providerId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  values?: RequiredResolverFn<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Integration'] = ResolversParentTypes['Integration']> = {
  Account: OptArgsResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  cohorts: OptArgsResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  isActive: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  name: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  option: OptArgsResolverFn<ResolversTypes['IntegrationOptions'], ParentType, ContextType>;
  projectId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings: OptArgsResolverFn<ResolversTypes['JSON'], ParentType, ContextType>;
  syncedAt: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Integration'] = ResolversParentTypes['Integration']> = {
  Account?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType>;
  accountId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  cohorts?: RequiredResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  option?: RequiredResolverFn<ResolversTypes['IntegrationOptions'], ParentType, ContextType>;
  projectId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings?: RequiredResolverFn<ResolversTypes['JSON'], ParentType, ContextType>;
  syncedAt?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationCohortResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['IntegrationCohort'] = ResolversParentTypes['IntegrationCohort']> = {
  appId: OptArgsResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  archived: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  chartId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finished: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hidden: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOfficialContent: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPredictive: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastComputed: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastMod: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastViewed: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  locationId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata: OptArgsResolverFn<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  name: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owners: OptArgsResolverFn<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  popularity: OptArgsResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  published: OptArgsResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shortcutIds: OptArgsResolverFn<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  size: OptArgsResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  syncedAt: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  type: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  view_count: OptArgsResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  viewers: OptArgsResolverFn<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationCohortRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['IntegrationCohort'] = ResolversParentTypes['IntegrationCohort']> = {
  appId?: RequiredResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  archived?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  chartId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finished?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hidden?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOfficialContent?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPredictive?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastComputed?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastMod?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastViewed?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  locationId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: RequiredResolverFn<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  name?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owners?: RequiredResolverFn<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  popularity?: RequiredResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  published?: RequiredResolverFn<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shortcutIds?: RequiredResolverFn<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  size?: RequiredResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  syncedAt?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  type?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  view_count?: RequiredResolverFn<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  viewers?: RequiredResolverFn<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type JourneyResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Journey'] = ResolversParentTypes['Journey']> = {
  accountId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classPrefix: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmCancel: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmCancelMessage: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  exitOnEsc: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  isActive: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  keyboardNavigation: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  tourName: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  useModalOverlay: OptArgsResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JourneyRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Journey'] = ResolversParentTypes['Journey']> = {
  accountId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classPrefix?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmCancel?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmCancelMessage?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  exitOnEsc?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  keyboardNavigation?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  tourName?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  useModalOverlay?: RequiredResolverFn<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetricResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Metric'] = ResolversParentTypes['Metric']> = {
  createdAt: OptArgsResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  journeyId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journeyState: OptArgsResolverFn<Maybe<ResolversTypes['JourneyState']>, ParentType, ContextType>;
  type: OptArgsResolverFn<ResolversTypes['MetricTypes'], ParentType, ContextType>;
  value: OptArgsResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetricRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Metric'] = ResolversParentTypes['Metric']> = {
  createdAt?: RequiredResolverFn<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  journeyId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journeyState?: RequiredResolverFn<Maybe<ResolversTypes['JourneyState']>, ParentType, ContextType>;
  type?: RequiredResolverFn<ResolversTypes['MetricTypes'], ParentType, ContextType>;
  value?: RequiredResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationcreateAccountArgs, 'input'>>;
  createActor: Resolver<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationcreateActorArgs, 'input'>>;
  createGroup: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationcreateGroupArgs, 'input'>>;
  createIntegration: Resolver<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationcreateIntegrationArgs, 'input'>>;
  createJourney: Resolver<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationcreateJourneyArgs, 'input'>>;
  createMetric: Resolver<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationcreateMetricArgs, 'input'>>;
  createUser: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteAccount: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationdeleteAccountArgs, 'id'>>;
  deleteActor: Resolver<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationdeleteActorArgs, 'id'>>;
  deleteGroup: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationdeleteGroupArgs, 'id'>>;
  deleteIntegration: Resolver<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationdeleteIntegrationArgs, 'id'>>;
  deleteJourney: Resolver<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationdeleteJourneyArgs, 'id'>>;
  deleteMetric: Resolver<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationdeleteMetricArgs, 'id'>>;
  deleteUser: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  syncIntegrationCohorts: Resolver<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationsyncIntegrationCohortsArgs, 'id'>>;
  updateAccount: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationupdateAccountArgs, 'id' | 'input'>>;
  updateActor: Resolver<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationupdateActorArgs, 'id' | 'input'>>;
  updateGroup: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationupdateGroupArgs, 'id' | 'input'>>;
  updateIntegration: Resolver<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationupdateIntegrationArgs, 'id' | 'input'>>;
  updateJourney: Resolver<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationupdateJourneyArgs, 'id' | 'input'>>;
  updateMetric: Resolver<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationupdateMetricArgs, 'id' | 'input'>>;
  updateUser: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id' | 'input'>>;
};

export type MutationRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationcreateAccountArgs, 'input'>>;
  createActor?: RequiredResolverFn<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationcreateActorArgs, 'input'>>;
  createGroup?: RequiredResolverFn<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationcreateGroupArgs, 'input'>>;
  createIntegration?: RequiredResolverFn<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationcreateIntegrationArgs, 'input'>>;
  createJourney?: RequiredResolverFn<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationcreateJourneyArgs, 'input'>>;
  createMetric?: RequiredResolverFn<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationcreateMetricArgs, 'input'>>;
  createUser?: RequiredResolverFn<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteAccount?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationdeleteAccountArgs, 'id'>>;
  deleteActor?: RequiredResolverFn<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationdeleteActorArgs, 'id'>>;
  deleteGroup?: RequiredResolverFn<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationdeleteGroupArgs, 'id'>>;
  deleteIntegration?: RequiredResolverFn<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationdeleteIntegrationArgs, 'id'>>;
  deleteJourney?: RequiredResolverFn<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationdeleteJourneyArgs, 'id'>>;
  deleteMetric?: RequiredResolverFn<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationdeleteMetricArgs, 'id'>>;
  deleteUser?: RequiredResolverFn<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  syncIntegrationCohorts?: RequiredResolverFn<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationsyncIntegrationCohortsArgs, 'id'>>;
  updateAccount?: RequiredResolverFn<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationupdateAccountArgs, 'id' | 'input'>>;
  updateActor?: RequiredResolverFn<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationupdateActorArgs, 'id' | 'input'>>;
  updateGroup?: RequiredResolverFn<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationupdateGroupArgs, 'id' | 'input'>>;
  updateIntegration?: RequiredResolverFn<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationupdateIntegrationArgs, 'id' | 'input'>>;
  updateJourney?: RequiredResolverFn<ResolversTypes['Journey'], ParentType, ContextType, RequireFields<MutationupdateJourneyArgs, 'id' | 'input'>>;
  updateMetric?: RequiredResolverFn<ResolversTypes['Metric'], ParentType, ContextType, RequireFields<MutationupdateMetricArgs, 'id' | 'input'>>;
  updateUser?: RequiredResolverFn<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id'>>;
  accounts: OptArgsResolverFn<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  actor: Resolver<Maybe<ResolversTypes['Actor']>, ParentType, ContextType, RequireFields<QueryactorArgs, 'id'>>;
  actors: OptArgsResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  actorsByJourney: Resolver<ResolversTypes['ActorsByJourneyList'], ParentType, ContextType, RequireFields<QueryactorsByJourneyArgs, 'journeyId'>>;
  actorsListPaginated: Resolver<ResolversTypes['ActorsList'], ParentType, ContextType, Partial<QueryactorsListPaginatedArgs>>;
  actorsWithMetrics: OptArgsResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  group: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QuerygroupArgs, 'id'>>;
  groups: OptArgsResolverFn<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  integration: Resolver<Maybe<ResolversTypes['Integration']>, ParentType, ContextType, RequireFields<QueryintegrationArgs, 'id'>>;
  integrations: OptArgsResolverFn<Array<ResolversTypes['Integration']>, ParentType, ContextType>;
  journey: Resolver<Maybe<ResolversTypes['Journey']>, ParentType, ContextType, RequireFields<QueryjourneyArgs, 'id'>>;
  journeys: OptArgsResolverFn<Array<ResolversTypes['Journey']>, ParentType, ContextType>;
  metric: Resolver<Maybe<ResolversTypes['Metric']>, ParentType, ContextType, RequireFields<QuerymetricArgs, 'id'>>;
  metrics: OptArgsResolverFn<Array<ResolversTypes['Metric']>, ParentType, ContextType>;
  redwood: OptArgsResolverFn<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  sendDemoRequest: Resolver<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendDemoRequestArgs, 'input'>>;
  sendEmail: Resolver<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendEmailArgs, 'input'>>;
  sendWelcomeEmail: Resolver<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendWelcomeEmailArgs, 'input'>>;
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users: OptArgsResolverFn<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type QueryRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: RequiredResolverFn<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id'>>;
  accounts?: RequiredResolverFn<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  actor?: RequiredResolverFn<Maybe<ResolversTypes['Actor']>, ParentType, ContextType, RequireFields<QueryactorArgs, 'id'>>;
  actors?: RequiredResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  actorsByJourney?: RequiredResolverFn<ResolversTypes['ActorsByJourneyList'], ParentType, ContextType, RequireFields<QueryactorsByJourneyArgs, 'journeyId'>>;
  actorsListPaginated?: RequiredResolverFn<ResolversTypes['ActorsList'], ParentType, ContextType, Partial<QueryactorsListPaginatedArgs>>;
  actorsWithMetrics?: RequiredResolverFn<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  group?: RequiredResolverFn<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QuerygroupArgs, 'id'>>;
  groups?: RequiredResolverFn<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  integration?: RequiredResolverFn<Maybe<ResolversTypes['Integration']>, ParentType, ContextType, RequireFields<QueryintegrationArgs, 'id'>>;
  integrations?: RequiredResolverFn<Array<ResolversTypes['Integration']>, ParentType, ContextType>;
  journey?: RequiredResolverFn<Maybe<ResolversTypes['Journey']>, ParentType, ContextType, RequireFields<QueryjourneyArgs, 'id'>>;
  journeys?: RequiredResolverFn<Array<ResolversTypes['Journey']>, ParentType, ContextType>;
  metric?: RequiredResolverFn<Maybe<ResolversTypes['Metric']>, ParentType, ContextType, RequireFields<QuerymetricArgs, 'id'>>;
  metrics?: RequiredResolverFn<Array<ResolversTypes['Metric']>, ParentType, ContextType>;
  redwood?: RequiredResolverFn<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  sendDemoRequest?: RequiredResolverFn<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendDemoRequestArgs, 'input'>>;
  sendEmail?: RequiredResolverFn<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendEmailArgs, 'input'>>;
  sendWelcomeEmail?: RequiredResolverFn<ResolversTypes['EmailResponse'], ParentType, ContextType, RequireFields<QuerysendWelcomeEmailArgs, 'input'>>;
  user?: RequiredResolverFn<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: RequiredResolverFn<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser: OptArgsResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RedwoodRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: RequiredResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Account: OptArgsResolverFn<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  accountId: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  hashedPassword: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  name: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetToken: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpiresAt: OptArgsResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  salt: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  type: OptArgsResolverFn<ResolversTypes['UserTypes'], ParentType, ContextType>;
  webAuthnChallenge: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Account?: RequiredResolverFn<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  accountId?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  hashedPassword?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  name?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetToken?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpiresAt?: RequiredResolverFn<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  salt?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  type?: RequiredResolverFn<ResolversTypes['UserTypes'], ParentType, ContextType>;
  webAuthnChallenge?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = RedwoodGraphQLContext> = {
  Account: AccountResolvers<ContextType>;
  Actor: ActorResolvers<ContextType>;
  ActorsByJourneyList: ActorsByJourneyListResolvers<ContextType>;
  ActorsList: ActorsListResolvers<ContextType>;
  BigInt: GraphQLScalarType;
  Byte: GraphQLScalarType;
  Date: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  EmailResponse: EmailResponseResolvers<ContextType>;
  Group: GroupResolvers<ContextType>;
  Integration: IntegrationResolvers<ContextType>;
  IntegrationCohort: IntegrationCohortResolvers<ContextType>;
  JSON: GraphQLScalarType;
  JSONObject: GraphQLScalarType;
  Journey: JourneyResolvers<ContextType>;
  Metric: MetricResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Redwood: RedwoodResolvers<ContextType>;
  Time: GraphQLScalarType;
  User: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = RedwoodGraphQLContext> = {
  requireAuth: requireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth: skipAuthDirectiveResolver<any, any, ContextType>;
};
