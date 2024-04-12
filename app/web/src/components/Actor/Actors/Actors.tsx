import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

import { routes } from '@redwoodjs/router';

import { Link } from 'src/components/ui/link';
import { timeTag, truncate } from 'src/lib/formatters';

const ActorsList = ({ actors }) => {
  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Identifier</TableHeaderCell>
          <TableHeaderCell>Last Active</TableHeaderCell>
          <TableHeaderCell>Current Journey</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {actors.map((actor) => (
          <TableRow key={actor.id}>
            <TableCell className="border-b-2 border-navy">
              {truncate(actor.id)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {timeTag(actor.createdAt, true)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {actor.metrics.length > 0 ? (
                <Link
                  to={routes.journey({
                    id: actor.metrics[0].journeyId,
                  })}
                  className="text-pink-600 hover:underline"
                  title={
                    'Show journey ' + actor.metrics[0].journeyId + ' detail'
                  }
                  isNavLink={true}
                >
                  {truncate(actor.metrics[0].journeyId)}
                </Link>
              ) : (
                'No current Journey'
              )}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {actor.metrics.length > 0
                ? truncate(actor.metrics[0].journeyState)
                : 'No current Journey'}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <Link
                to={routes.actor({ id: actor.id })}
                className="text-pink-600 hover:underline"
                title={'Show actor ' + actor.id + ' detail'}
                isNavLink={true}
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActorsList;
