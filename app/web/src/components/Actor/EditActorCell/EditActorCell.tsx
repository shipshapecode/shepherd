import type { EditActorById, UpdateActorInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ActorForm from 'src/components/Actor/ActorForm';

export const QUERY = gql`
  query EditActorById($id: Int!) {
    actor: actor(id: $id) {
      id
      createdAt
    }
  }
`;
const UPDATE_ACTOR_MUTATION = gql`
  mutation UpdateActorMutation($id: Int!, $input: UpdateActorInput!) {
    updateActor(id: $id, input: $input) {
      id
      createdAt
      accountId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ actor }: CellSuccessProps<EditActorById>) => {
  const [updateActor, { loading, error }] = useMutation(UPDATE_ACTOR_MUTATION, {
    onCompleted: () => {
      toast.success('Actor updated');
      navigate(routes.actors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (
    input: UpdateActorInput,
    id: EditActorById['actor']['id']
  ) => {
    updateActor({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Actor {actor?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ActorForm
          actor={actor}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
