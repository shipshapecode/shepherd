import type { FindGroupById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Group from 'src/components/Group/Group';

export const QUERY = gql`
  query FindGroupById($id: String!) {
    group: group(id: $id) {
      id
      createdAt
      updatedAt
      name
      providerId
      key
      values
      accountId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Group not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ group }: CellSuccessProps<FindGroupById>) => {
  return <Group group={group} />;
};
