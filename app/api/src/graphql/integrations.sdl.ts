export const schema = gql`
  type Integration {
    id: String!
    createdAt: DateTime!
    syncedAt: DateTime
    updatedAt: DateTime!
    isActive: Boolean!
    name: String!
    option: IntegrationOptions!
    cohorts: JSON
    settings: JSON!
    Account: Account!
    accountId: String!
    projectId: String
  }

  type IntegrationCohort {
    isActive: Boolean
    appId: Int
    archived: Boolean
    # definition: { COHORT_DEFINITION }
    description: String
    finished: Boolean
    id: String
    name: String
    owners: [String]!
    viewers: [String]!
    published: Boolean
    size: Int
    syncedAt: DateTime
    type: String
    lastMod: DateTime
    createdAt: DateTime
    lastComputed: DateTime
    hidden: Boolean
    metadata: [String]
    view_count: Int
    popularity: Int
    lastViewed: DateTime
    chartId: String
    editId: String
    isPredictive: Boolean
    isOfficialContent: Boolean
    locationId: String
    shortcutIds: [String]
    # syncMetadata: [COHORT_SYNC_METADATA]
  }

  enum IntegrationOptions {
    AMPLITUDE
    POSTHOG
  }

  type Query {
    integrations: [Integration!]! @requireAuth
    integration(id: String!): Integration @requireAuth
  }

  input CreateIntegrationInput {
    name: String!
    option: IntegrationOptions!
    settings: JSON!
    accountId: String!
  }

  input UpdateIntegrationInput {
    name: String
    option: IntegrationOptions
    cohorts: JSON
    settings: JSON
    accountId: String
  }

  type Mutation {
    createIntegration(input: CreateIntegrationInput!): Integration! @requireAuth
    updateIntegration(
      id: String!
      input: UpdateIntegrationInput!
    ): Integration! @requireAuth
    syncIntegrationCohorts(id: String!): Integration! @requireAuth
    deleteIntegration(id: String!): Integration! @requireAuth
  }
`;
