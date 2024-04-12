export const schema = gql`
  type Actor {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    properties: JSON
    accountId: String!
    Account: Account!
    metrics: [Metric]!
  }

  type ActorsList {
    actors: [Actor!]!
    count: Int!
  }
  type ActorsByJourneyList {
    actors: [Actor!]!
    count: Int!
    totalCanceled: Int!
    totalFinished: Int!
  }

  type Query {
    actors: [Actor!]! @requireAuth
    actorsByJourney(journeyId: String!): ActorsByJourneyList! @requireAuth
    actorsListPaginated(page: Int): ActorsList! @requireAuth
    actorsWithMetrics: [Actor!]! @requireAuth
    actor(id: Int!): Actor @requireAuth
  }

  input CreateActorInput {
    accountId: String!
    journeyId: String
  }

  input UpdateActorInput {
    accountId: String
    journeyId: String
  }

  type Mutation {
    createActor(input: CreateActorInput!): Actor! @requireAuth
    updateActor(id: Int!, input: UpdateActorInput!): Actor! @requireAuth
    deleteActor(id: Int!): Actor! @requireAuth
  }
`;
