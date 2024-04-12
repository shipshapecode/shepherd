import type { FindIntegrations } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Integrations from 'src/components/Integration/Integrations';

export const QUERY = gql`
  query FindIntegrations {
    integrations {
      id
      createdAt
      updatedAt
      name
      option
      settings
      accountId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No integrations yet. '}
      <Link to={routes.newIntegration()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  integrations,
}: CellSuccessProps<FindIntegrations>) => {
  return (
    <>
      <div className="text-right font-body text-sm">
        <span className="mr-2 text-gray-500">{'Add More Integrations?'}</span>
        <Link to={routes.newIntegration()} className="rw-link">
          {'Create another'}
        </Link>
      </div>
      <Integrations integrations={integrations} />
    </>
  );
};
