export const schema = gql`
  type Account {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    apiKey: String!
    actors: [Actor]!
    journeys: [Journey]!
    metrics: [Metric]!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    apiKey: String!
  }

  input UpdateAccountInput {
    apiKey: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`;
