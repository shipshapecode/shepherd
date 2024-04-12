import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import type { FindJourneys, UpdateJourneyInput } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { Link } from 'src/components/ui/link';
import { Switch } from 'src/components/ui/switch';
import { timeTag, truncate } from 'src/lib/formatters';

const UPDATE_JOURNEY_MUTATION = gql`
  mutation UpdateJourneyActiveMutation(
    $id: String!
    $input: UpdateJourneyInput!
  ) {
    updateJourney(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      uniqueId
      isActive
      tourName
    }
  }
`;

const JourneysList = ({ journeys }: FindJourneys) => {
  const [updateJourney] = useMutation(UPDATE_JOURNEY_MUTATION, {
    onCompleted: () => {
      toast.success('Journey updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSwitchChange = (id, journey: UpdateJourneyInput) => {
    updateJourney({ variables: { id, input: journey } });
  };

  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Unique Id</TableHeaderCell>
          <TableHeaderCell>Created</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
          {/* <TableHeaderCell>&nbsp;</TableHeaderCell> */}
        </TableRow>
      </TableHead>

      <TableBody>
        {journeys.map((journey) => (
          <TableRow key={journey.id}>
            <TableCell className="border-b-2 border-navy">
              {truncate(journey.tourName)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <Link
                to={routes.journey({
                  id: journey.id,
                })}
                className="text-pink-600 hover:underline"
                title={'Show journey ' + journey.id + ' detail'}
                isNavLink={true}
              >
                {journey.uniqueId}
              </Link>
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {timeTag(journey.createdAt)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <Switch
                name="is_active"
                checked={journey.isActive}
                onChange={(isActive: boolean) =>
                  handleSwitchChange(journey.id, { isActive })
                }
              />
            </TableCell>

            {/* <TableCell className="border-b-2 border-navy">
              <Link to={routes.editJourney({ id: journey.id })}>Edit</Link>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JourneysList;
