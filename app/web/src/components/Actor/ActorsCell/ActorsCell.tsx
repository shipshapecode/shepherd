import type { ActorsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Actors from 'src/components/Actor/Actors';
import Pagination from 'src/components/Pagination';

export const QUERY = gql`
  query ActorsQuery($page: Int) {
    actorsListPaginated(page: $page) {
      actors {
        id
        createdAt
        accountId
        properties
        metrics {
          id
          createdAt
          journeyId
          journeyState
          type
        }
      }
      count
    }
  }
`;

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1;

  return { variables: { page } };
};

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <h4 className="font-heading text-xl">No Users</h4>
      <span className="text-md">
        Start your first Journey to begin tracking users
      </span>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  actorsListPaginated,
}: CellSuccessProps<ActorsQuery>) => {
  return (
    <>
      <Actors actors={actorsListPaginated.actors} />
      {actorsListPaginated.count > 20 && (
        <Pagination count={actorsListPaginated.count} />
      )}
    </>
  );
};
