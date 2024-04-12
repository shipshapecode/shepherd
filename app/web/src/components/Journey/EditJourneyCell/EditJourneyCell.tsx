import type { EditJourneyById, UpdateJourneyInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import JourneyForm from 'src/components/Journey/JourneyForm';

export const QUERY = gql`
  query EditJourneyById($id: String!) {
    journey: journey(id: $id) {
      id
      createdAt
      updatedAt
      confirmCancel
      confirmCancelMessage
      classPrefix
      # defaultStepOptions
      exitOnEsc
      keyboardNavigation
      # modalContainer
      # stepsContainer
      tourName
      useModalOverlay
    }
  }
`;
const UPDATE_JOURNEY_MUTATION = gql`
  mutation UpdateJourneyMutation($id: String!, $input: UpdateJourneyInput!) {
    updateJourney(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      confirmCancel
      confirmCancelMessage
      classPrefix
      # defaultStepOptions
      exitOnEsc
      keyboardNavigation
      # modalContainer
      # stepsContainer
      tourName
      useModalOverlay
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ journey }: CellSuccessProps<EditJourneyById>) => {
  const [updateJourney, { loading, error }] = useMutation(
    UPDATE_JOURNEY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Journey updated');
        navigate(routes.journeys());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateJourneyInput,
    id: EditJourneyById['journey']['id']
  ) => {
    updateJourney({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Journey {journey?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JourneyForm
          journey={journey}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
