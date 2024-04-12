export const schema = gql`
  type Metric {
    id: Int!
    createdAt: DateTime!
    type: MetricTypes!
    journeyId: String
    journeyState: JourneyState
    value: JSON
  }

  # type MetricValue {
  #   eventType: String!
  #   currentUrl: String
  #   currentUserId: Int
  #   journeyData: JourneyData
  # }

  # type JourneyData {
  #   id: String!
  #   currentStep: Int
  #   numberOfSteps: Int
  # }

  enum JourneyState {
    ACTIVE
    CANCEL
    COMPLETE
    SHOW
  }

  enum MetricTypes {
    EVENT
    IDENTIFY
  }

  type Query {
    metrics: [Metric!]! @requireAuth
    metric(id: Int!): Metric @requireAuth
  }

  input CreateMetricInput {
    date: DateTime!
    type: MetricTypes!
    value: String!
    journeyId: String
  }

  input UpdateMetricInput {
    date: DateTime
    type: MetricTypes
    value: String
    journeyId: String
  }

  type Mutation {
    createMetric(input: CreateMetricInput!): Metric! @requireAuth
    updateMetric(id: Int!, input: UpdateMetricInput!): Metric! @requireAuth
    deleteMetric(id: Int!): Metric! @requireAuth
  }
`;
