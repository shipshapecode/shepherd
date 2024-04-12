import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import type { FindActorById, Metric } from 'types/graphql';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';
import { timeTag } from 'src/lib/formatters';

interface Props {
  actor: NonNullable<FindActorById['actor']>;
}

type MetricValue = {
  eventType: string;
  currentUrl: string;
  currentUserId: number;
  journeyData: JourneyData;
  journeyId: string;
};

type JourneyData = {
  id: string;
  currentStep: number;
  numberOfSteps: number;
};

const ActorPropertiesList = ({ properties }: { properties: string }) => {
  return (
    <dl>
      {Object.entries(properties).map(([key, value]) => (
        <div key={key}>
          <dt className="font-heading font-bold capitalize">{key}</dt>
          <dd className="mb-2">{value}</dd>
        </div>
      ))}
    </dl>
  );
};
const MetricValuesList = ({ metrics }: { metrics: Metric[] }) => {
  const parsedMetricValues: Record<string, string | number>[] = metrics.map(
    (metric) => {
      const { id, journeyId, journeyState, value } = metric;
      const notInProgressValues = ['COMPLETE', 'CANCEL', 'ACTIVE'];
      const notInProgress = notInProgressValues.includes(journeyState);
      const stepString = notInProgress
        ? ''
        : `${(value as MetricValue).journeyData.currentStep ?? 1} / ${
            (value as MetricValue).journeyData.numberOfSteps
          }`;

      return {
        id,
        type: journeyState,
        url: (value as MetricValue).currentUrl,
        journey: journeyId,
        step: stepString,
      };
    }
  );
  const sortedMetricValues = parsedMetricValues.sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  return (
    <Table className="mt-8 max-h-80 w-full">
      <TableHead className="sticky top-0 bg-white">
        <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
          <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Type
          </TableHeaderCell>
          <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            URL
          </TableHeaderCell>
          <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Journey
          </TableHeaderCell>
          <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Step
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody className="h-80 overflow-y-scroll">
        {sortedMetricValues.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {item.type}
            </TableCell>
            <TableCell>{item.url}</TableCell>
            <TableCell>{item.journey}</TableCell>
            <TableCell>{item.step}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Actor = ({ actor }: Props) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-8">
          <dl className="col-span-1">
            <dt className="font-heading font-bold">Unique ID</dt>
            <dd className="mb-2">{`shepherd-guest_${actor.id}`}</dd>
            <dt className="font-heading font-bold">Created at</dt>
            <dd className="mb-2">{timeTag(actor.createdAt)}</dd>
            <dt className="font-heading font-bold">Latest Journey</dt>
            <dd className="mb-2">{actor.metrics[0].journeyId ?? 'N/A'}</dd>
          </dl>
          <dl className="col-span-1">
            <dt className="font-heading font-bold">User ID</dt>
            <dd className="mb-2">{actor.id}</dd>
            <dt className="font-heading font-bold">Updated last</dt>
            <dd className="mb-2">{timeTag(actor.updatedAt)}</dd>
            <dt className="font-heading font-bold">Identifier</dt>
            <dd className="mb-2">{'N/A'}</dd>
          </dl>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-3 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Properties</CardTitle>
          </CardHeader>
          <CardContent>
            {actor.properties ? (
              <ActorPropertiesList properties={actor.properties} />
            ) : (
              'No properties found.'
            )}
          </CardContent>
        </Card>
        <Card className="col-span-2 w-full">
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {actor.metrics.length ? (
              <MetricValuesList metrics={actor.metrics} />
            ) : (
              'No metrics available.'
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Actor;
