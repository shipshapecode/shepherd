import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ActorForm from 'src/components/Actor/ActorForm';

import type { CreateActorInput } from 'types/graphql';

const CREATE_ACTOR_MUTATION = gql`
  mutation CreateActorMutation($input: CreateActorInput!) {
    createActor(input: $input) {
      id
    }
  }
`;

const NewActor = () => {
  const [createActor, { loading, error }] = useMutation(CREATE_ACTOR_MUTATION, {
    onCompleted: () => {
      toast.success('Actor created');
      navigate(routes.actors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateActorInput) => {
    createActor({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Actor</h2>
      </header>
      <div className="rw-segment-main">
        <ActorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewActor;
