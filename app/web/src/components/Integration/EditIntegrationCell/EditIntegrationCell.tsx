import type {
  EditIntegrationById,
  UpdateIntegrationInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';
import IntegrationForm from 'src/components/Integration/IntegrationForm';

export const QUERY = gql`
  query EditIntegrationById($id: String!) {
    integration: integration(id: $id) {
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
const UPDATE_INTEGRATION_MUTATION = gql`
  mutation UpdateIntegrationMutation(
    $id: String!
    $input: UpdateIntegrationInput!
  ) {
    updateIntegration(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  integration,
}: CellSuccessProps<EditIntegrationById>) => {
  const [updateIntegration, { loading, error }] = useMutation(
    UPDATE_INTEGRATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Integration updated');
        navigate(routes.integrations());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateIntegrationInput,
    id: EditIntegrationById['integration']['id']
  ) => {
    updateIntegration({ variables: { id, input } });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="mb-6 font-heading">
          {`Edit Integration for ${integration?.option}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <IntegrationForm
          integration={integration}
          onSave={onSave}
          loading={loading}
          error={error}
          isEdit
        />
      </CardContent>
    </Card>
  );
};
