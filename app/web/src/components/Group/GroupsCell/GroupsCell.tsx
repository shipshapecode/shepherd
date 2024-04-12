import type { FindGroups } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Groups from 'src/components/Group/Groups';

export const QUERY = gql`
  query FindGroups {
    groups {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <h4 className="font-heading text-xl">No Groups</h4>
      <span className="text-md">Import some groups</span>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ groups }: CellSuccessProps<FindGroups>) => {
  return <Groups groups={groups} />;
};
