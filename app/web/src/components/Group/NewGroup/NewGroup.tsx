import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import GroupForm from 'src/components/Group/GroupForm';

import type { CreateGroupInput } from 'types/graphql';

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
    }
  }
`;

const NewGroup = () => {
  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group created');
      navigate(routes.groups());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateGroupInput) => {
    createGroup({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Group</h2>
      </header>
      <div className="rw-segment-main">
        <GroupForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewGroup;
