import type { FindIntegrationById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Integration from 'src/components/Integration/Integration';

export const QUERY = gql`
  query FindIntegrationById($id: String!) {
    integration: integration(id: $id) {
      id
      createdAt
      updatedAt
      name
      option
      cohorts
      settings
      accountId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Integration not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  integration,
}: CellSuccessProps<FindIntegrationById>) => {
  return <Integration integration={integration} />;
};
