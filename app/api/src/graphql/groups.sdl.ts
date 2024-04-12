export const schema = gql`
  type Group {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    providerId: String!
    key: String!
    values: JSON!
    actors: [Actor]!
    Account: Account!
    accountId: String!
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: String!): Group @requireAuth
  }

  input CreateGroupInput {
    name: String!
    providerId: String!
    key: String!
    values: JSON!
    accountId: String!
  }

  input UpdateGroupInput {
    name: String
    providerId: String
    key: String
    values: JSON
    accountId: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: String!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: String!): Group! @requireAuth
  }
`;
