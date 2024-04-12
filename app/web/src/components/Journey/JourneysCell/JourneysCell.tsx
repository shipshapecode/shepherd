import type { FindJourneys } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Journeys from 'src/components/Journey/Journeys';

export const QUERY = gql`
  query FindJourneys {
    journeys: journeys {
      id
      accountId
      uniqueId
      createdAt
      updatedAt
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
      useModalOverlay
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <h4 className="font-heading text-xl">No Journeys</h4>
      <span className="text-md">
        {'Check if you have connected your account to the Shepherd library.'}
      </span>

      {' Or, '}
      <Link to={routes.newJourney()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ journeys }: CellSuccessProps<FindJourneys>) => {
  return (
    <>
      <div className="text-right font-body text-sm">
        <span className="mr-2 text-gray-500">{'Add More Journeys?'}</span>
        <Link to={routes.newJourney()} className="rw-link">
          {'Create another.'}
        </Link>
      </div>
      <Journeys journeys={journeys} />
    </>
  );
};
