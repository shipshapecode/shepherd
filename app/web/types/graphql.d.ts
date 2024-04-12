import { Prisma } from "@prisma/client"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Byte: Buffer;
  Date: string;
  DateTime: string;
  JSON: Prisma.JsonValue;
  JSONObject: Prisma.JsonObject;
  Time: string;
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

export type FindActorByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindActorById = { __typename?: 'Query', actor?: { __typename?: 'Actor', id: number, createdAt: string, updatedAt?: string | null, properties?: Prisma.JsonValue | null, metrics: Array<{ __typename?: 'Metric', id: number, createdAt: string, journeyId?: string | null, journeyState?: JourneyState | null, type: MetricTypes, value?: Prisma.JsonValue | null } | null> } | null };

export type ActorsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type ActorsQuery = { __typename?: 'Query', actorsListPaginated: { __typename?: 'ActorsList', count: number, actors: Array<{ __typename?: 'Actor', id: number, createdAt: string, accountId: string, properties?: Prisma.JsonValue | null, metrics: Array<{ __typename?: 'Metric', id: number, createdAt: string, journeyId?: string | null, journeyState?: JourneyState | null, type: MetricTypes } | null> }> } };

export type EditActorByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EditActorById = { __typename?: 'Query', actor?: { __typename?: 'Actor', id: number, createdAt: string } | null };

export type UpdateActorMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateActorInput;
}>;


export type UpdateActorMutation = { __typename?: 'Mutation', updateActor: { __typename?: 'Actor', id: number, createdAt: string, accountId: string } };

export type CreateActorMutationVariables = Exact<{
  input: CreateActorInput;
}>;


export type CreateActorMutation = { __typename?: 'Mutation', createActor: { __typename?: 'Actor', id: number } };

export type ActorsFromJourneyVariables = Exact<{
  journeyId: Scalars['String'];
}>;


export type ActorsFromJourney = { __typename?: 'Query', actorsByJourney: { __typename?: 'ActorsByJourneyList', count: number, totalCanceled: number, totalFinished: number, actors: Array<{ __typename?: 'Actor', id: number }> } };

export type SendDemoQueryVariables = Exact<{
  input: DemoEmailInput;
}>;


export type SendDemoQuery = { __typename?: 'Query', sendDemoRequest: { __typename?: 'EmailResponse', statusId: string } };

export type EditGroupByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type EditGroupById = { __typename?: 'Query', group?: { __typename?: 'Group', id: string, createdAt: string, updatedAt: string, name: string, providerId: string, key: string, values: Prisma.JsonValue, accountId: string } | null };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateGroupInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, createdAt: string, updatedAt: string, name: string, providerId: string, key: string, values: Prisma.JsonValue, accountId: string } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type FindGroupByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindGroupById = { __typename?: 'Query', group?: { __typename?: 'Group', id: string, createdAt: string, updatedAt: string, name: string, providerId: string, key: string, values: Prisma.JsonValue, accountId: string } | null };

export type FindGroupsVariables = Exact<{ [key: string]: never; }>;


export type FindGroups = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, createdAt: string, updatedAt: string, name: string, providerId: string, key: string, values: Prisma.JsonValue, accountId: string }> };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string } };

export type EditIntegrationByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type EditIntegrationById = { __typename?: 'Query', integration?: { __typename?: 'Integration', id: string, createdAt: string, updatedAt: string, name: string, option: IntegrationOptions, settings: Prisma.JsonValue, accountId: string } | null };

export type UpdateIntegrationMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateIntegrationInput;
}>;


export type UpdateIntegrationMutation = { __typename?: 'Mutation', updateIntegration: { __typename?: 'Integration', id: string, createdAt: string, updatedAt: string, name: string, option: IntegrationOptions, settings: Prisma.JsonValue, accountId: string } };

export type DeleteIntegrationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteIntegrationMutation = { __typename?: 'Mutation', deleteIntegration: { __typename?: 'Integration', id: string } };

export type UpdateIntegrationCohortsMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateIntegrationInput;
}>;


export type UpdateIntegrationCohortsMutation = { __typename?: 'Mutation', updateIntegration: { __typename?: 'Integration', id: string, createdAt: string, updatedAt: string, name: string, option: IntegrationOptions, settings: Prisma.JsonValue, cohorts?: Prisma.JsonValue | null, syncedAt?: string | null } };

export type SyncIntegrationCohortsMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SyncIntegrationCohortsMutation = { __typename?: 'Mutation', syncIntegrationCohorts: { __typename?: 'Integration', cohorts?: Prisma.JsonValue | null, syncedAt?: string | null } };

export type FindIntegrationByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindIntegrationById = { __typename?: 'Query', integration?: { __typename?: 'Integration', id: string, createdAt: string, updatedAt: string, name: string, option: IntegrationOptions, cohorts?: Prisma.JsonValue | null, settings: Prisma.JsonValue, accountId: string } | null };

export type FindIntegrationsVariables = Exact<{ [key: string]: never; }>;


export type FindIntegrations = { __typename?: 'Query', integrations: Array<{ __typename?: 'Integration', id: string, createdAt: string, updatedAt: string, name: string, option: IntegrationOptions, settings: Prisma.JsonValue, accountId: string }> };

export type CreateIntegrationMutationVariables = Exact<{
  input: CreateIntegrationInput;
}>;


export type CreateIntegrationMutation = { __typename?: 'Mutation', createIntegration: { __typename?: 'Integration', id: string } };

export type EditJourneyByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type EditJourneyById = { __typename?: 'Query', journey?: { __typename?: 'Journey', id: string, createdAt: string, updatedAt: string, confirmCancel: boolean, confirmCancelMessage?: string | null, classPrefix?: string | null, exitOnEsc: boolean, keyboardNavigation: boolean, tourName?: string | null, useModalOverlay: boolean } | null };

export type UpdateJourneyMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateJourneyInput;
}>;


export type UpdateJourneyMutation = { __typename?: 'Mutation', updateJourney: { __typename?: 'Journey', id: string, createdAt: string, updatedAt: string, confirmCancel: boolean, confirmCancelMessage?: string | null, classPrefix?: string | null, exitOnEsc: boolean, keyboardNavigation: boolean, tourName?: string | null, useModalOverlay: boolean } };

export type FindJourneyByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindJourneyById = { __typename?: 'Query', journey?: { __typename?: 'Journey', id: string, createdAt: string, updatedAt: string, accountId?: string | null, confirmCancel: boolean, confirmCancelMessage?: string | null, classPrefix?: string | null, exitOnEsc: boolean, isActive: boolean, keyboardNavigation: boolean, tourName?: string | null, uniqueId?: string | null, useModalOverlay: boolean } | null };

export type UpdateJourneyActiveMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateJourneyInput;
}>;


export type UpdateJourneyActiveMutation = { __typename?: 'Mutation', updateJourney: { __typename?: 'Journey', id: string, createdAt: string, updatedAt: string, uniqueId?: string | null, isActive: boolean, tourName?: string | null } };

export type FindJourneysVariables = Exact<{ [key: string]: never; }>;


export type FindJourneys = { __typename?: 'Query', journeys: Array<{ __typename?: 'Journey', id: string, accountId?: string | null, uniqueId?: string | null, createdAt: string, updatedAt: string, confirmCancel: boolean, confirmCancelMessage?: string | null, classPrefix?: string | null, exitOnEsc: boolean, isActive: boolean, keyboardNavigation: boolean, tourName?: string | null, useModalOverlay: boolean }> };

export type CreateJourneyMutationVariables = Exact<{
  input: CreateJourneyInput;
}>;


export type CreateJourneyMutation = { __typename?: 'Mutation', createJourney: { __typename?: 'Journey', id: string } };

export type MetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetricsQuery = { __typename?: 'Query', metrics: Array<{ __typename?: 'Metric', id: number }> };

export type UpdateUserEmailMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserInput;
}>;


export type UpdateUserEmailMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string } };

export type DeleteUserAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserAccountMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string } };
