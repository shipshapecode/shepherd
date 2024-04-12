import type { CreateIntegrationInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { Metadata } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';
import IntegrationForm from 'src/components/Integration/IntegrationForm';

const CREATE_INTEGRATION_MUTATION = gql`
  mutation CreateIntegrationMutation($input: CreateIntegrationInput!) {
    createIntegration(input: $input) {
      id
    }
  }
`;

const NewIntegration = () => {
  const [createIntegration, { loading, error }] = useMutation(
    CREATE_INTEGRATION_MUTATION,
    {
      onCompleted: (data) => {
        const id = data.createIntegration.id;
        toast.success('Integration created');
        navigate(routes.integration({ id }));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateIntegrationInput) => {
    createIntegration({ variables: { input } });
  };

  return (
    <>
      <Metadata title="Add Integration" />

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="mb-6 font-heading">
            {'New Integration'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IntegrationForm onSave={onSave} loading={loading} error={error} />
        </CardContent>
      </Card>
    </>
  );
};

export default NewIntegration;
