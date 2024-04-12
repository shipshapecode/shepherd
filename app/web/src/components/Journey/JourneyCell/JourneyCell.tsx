import type { FindJourneyById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Journey from 'src/components/Journey/Journey';

export const QUERY = gql`
  query FindJourneyById($id: String!) {
    journey: journey(id: $id) {
      id
      createdAt
      updatedAt
      accountId
      confirmCancel
      confirmCancelMessage
      classPrefix
      # defaultStepOptions
      exitOnEsc
      isActive
      keyboardNavigation
      # modalContainer
      # stepsContainer
      tourName
      uniqueId
      useModalOverlay
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Journey not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ journey }: CellSuccessProps<FindJourneyById>) => {
  return <Journey journey={journey} />;
};
