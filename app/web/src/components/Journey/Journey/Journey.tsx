import type {
  // DeleteJourneyMutationVariables,
  FindJourneyById,
} from 'types/graphql';

import ActorsKpiCell from 'src/components/ActorsKpiCell';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';
import { timeTag } from 'src/lib/formatters';
// import ChartView from 'src/components/ChartView';

// import { routes, navigate } from '@redwoodjs/router';
// import { useMutation } from '@redwoodjs/web';
// import { toast } from '@redwoodjs/web/toast';

// import { Link } from 'src/components/ui/link';

// const DELETE_JOURNEY_MUTATION = gql`
//   mutation DeleteJourneyMutation($id: String!) {
//     deleteJourney(id: $id) {
//       id
//     }
//   }
// `;

interface Props {
  journey: NonNullable<FindJourneyById['journey']>;
}

const Journey = ({ journey }: Props) => {
  // const [deleteJourney] = useMutation(DELETE_JOURNEY_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('Journey deleted');
  //     navigate(routes.journeys());
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const onDeleteClick = (id: DeleteJourneyMutationVariables['id']) => {
  //   if (confirm('Are you sure you want to delete journey ' + id + '?')) {
  //     deleteJourney({ variables: { id } });
  //   }
  // };

  return (
    <>
      <ActorsKpiCell journeyId={journey.id} />

      {/* <ChartView /> */}
      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle>{`${journey.tourName} Details`}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-8">
          <dl className="col-span-1">
            <dt className="font-heading font-bold">Unique ID</dt>
            <dd className="mb-2">{journey.uniqueId}</dd>
            <dt className="font-heading font-bold">Created at</dt>
            <dd className="mb-2">{timeTag(journey.createdAt)}</dd>
          </dl>
          <dl className="col-span-1">
            <dt className="font-heading font-bold">Shepherd ID</dt>
            <dd className="mb-2">{journey.id}</dd>
            <dt className="font-heading font-bold">Updated last</dt>
            <dd className="mb-2">{timeTag(journey.updatedAt)}</dd>
            <dt className="font-heading font-bold">Active</dt>
            <dd className="mb-2">{journey.isActive.toString()}</dd>
          </dl>
        </CardContent>
      </Card>
      {/* <nav className="rw-button-group">
        <Link
          to={routes.editJourney({ id: journey.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(journey.id)}
        >
          Delete
        </button>
      </nav> */}
    </>
  );
};

export default Journey;
