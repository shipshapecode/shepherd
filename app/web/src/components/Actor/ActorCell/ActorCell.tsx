import type { FindActorById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Actor from 'src/components/Actor/Actor';

export const QUERY = gql`
  query FindActorById($id: Int!) {
    actor: actor(id: $id) {
      id
      createdAt
      updatedAt
      properties
      metrics {
        id
        createdAt
        journeyId
        journeyState
        type
        value
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Actor not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ actor }: CellSuccessProps<FindActorById>) => {
  return <Actor actor={actor} />;
};
