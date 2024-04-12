import type { CreateJourneyInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation, Metadata } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';
import JourneyForm from 'src/components/Journey/JourneyForm';

const CREATE_JOURNEY_MUTATION = gql`
  mutation CreateJourneyMutation($input: CreateJourneyInput!) {
    createJourney(input: $input) {
      id
    }
  }
`;

const NewJourney = () => {
  const { currentUser } = useAuth();
  const [createJourney, { loading, error }] = useMutation(
    CREATE_JOURNEY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Journey created');
        navigate(routes.journeys());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateJourneyInput) => {
    const inputWithAccount = { ...input, accountId: currentUser.accountId };
    createJourney({ variables: { input: inputWithAccount } });
  };

  return (
    <>
      <Metadata
        title="Add Integration"
        description="A form to add initial configuration details for a Journey"
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="mb-6 font-heading">
            {'New Integration'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JourneyForm onSave={onSave} loading={loading} error={error} />
        </CardContent>
      </Card>
    </>
  );
};

export default NewJourney;
