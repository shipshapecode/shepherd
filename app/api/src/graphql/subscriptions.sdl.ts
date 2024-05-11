export const schema = gql`
  type Subscription {
    id: String!
    chargeBeeCustomerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    startDate: DateTime
    trailEnds: DateTime
    status: SubscriptionStatus!
    type: String
    data: JSON
    User: [User]
  }

  enum SubscriptionStatus {
    ACTIVE
    CANCELLED
    FREE_TRIAL
    FUTURE
    IN_TRIAL
    NON_RENEWING
    PAUSED
  }

  input CreateSubscriptionInput {
    status: SubscriptionStatus!
    type: String!
    userId: String!
  }

  type HostedPage {
    id: String!
    url: String!
  }
  type PortalPage {
    id: String!
    access_url: String!
  }

  input UpdateSubscriptionInput {
    chargeBeeCustomerId: String!
    status: SubscriptionStatus!
    type: String!
  }

  type Query {
    getSubscriptionCheckoutUrl(planId: String!): HostedPage! @skipAuth
    getSubscriptionPortalSesion: PortalPage! @requireAuth
    subscriptions: [Subscription!]! @requireAuth
    subscription(chargeBeeCustomerId: String!): Subscription @requireAuth
  }

  type Mutation {
    createSubscription(input: CreateSubscriptionInput!): Subscription! @skipAuth
    updateSubscriptionViaWebhook(
      input: UpdateSubscriptionInput!
    ): Subscription! @requireAuth
  }
`;
