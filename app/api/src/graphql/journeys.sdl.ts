export const schema = gql`
  type Journey {
    id: String!
    accountId: String
    uniqueId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    confirmCancel: Boolean!
    confirmCancelMessage: String
    classPrefix: String
    # defaultStepOptions: String
    exitOnEsc: Boolean!
    isActive: Boolean!
    keyboardNavigation: Boolean!
    # modalContainer: String
    # stepsContainer: String
    tourName: String
    useModalOverlay: Boolean!
    # steps: [Step]!
  }

  type Query {
    journeys: [Journey!]! @requireAuth
    journey(id: String!): Journey @requireAuth
  }

  input CreateJourneyInput {
    accountId: String!
    uniqueId: String!
    confirmCancel: Boolean
    confirmCancelMessage: String
    classPrefix: String
    # defaultStepOptions: String
    exitOnEsc: Boolean
    keyboardNavigation: Boolean
    # modalContainer: String
    # stepsContainer: String
    tourName: String
    useModalOverlay: Boolean
  }

  input UpdateJourneyInput {
    confirmCancel: Boolean
    confirmCancelMessage: String
    classPrefix: String
    exitOnEsc: Boolean
    isActive: Boolean
    keyboardNavigation: Boolean
    tourName: String
    useModalOverlay: Boolean
  }

  type Mutation {
    createJourney(input: CreateJourneyInput!): Journey! @requireAuth
    updateJourney(id: String!, input: UpdateJourneyInput!): Journey!
      @requireAuth
    deleteJourney(id: String!): Journey! @requireAuth
  }
`;
