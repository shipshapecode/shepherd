export const schema = gql`
  input EmailInput {
    from: String
    to: String!
    subject: String
  }
  input DemoEmailInput {
    from: String!
    name: String
    subject: String
    title: String
  }

  type EmailResponse {
    from: String
    to: String
    name: String
    subject: String
    statusId: String!
    title: String
  }

  type Query {
    sendDemoRequest(input: DemoEmailInput!): EmailResponse! @skipAuth
    sendEmail(input: EmailInput!): EmailResponse! @requireAuth
    sendWelcomeEmail(input: EmailInput!): EmailResponse! @requireAuth
  }
`;
