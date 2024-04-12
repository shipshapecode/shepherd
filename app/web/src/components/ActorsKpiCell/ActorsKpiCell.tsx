import { Grid } from '@tremor/react';
import type { ActorsFromJourney } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import KpiCard, { type Kpi } from 'src/components/KpiCard';

export const QUERY = gql`
  query ActorsFromJourney($journeyId: String!) {
    actorsByJourney(journeyId: $journeyId) {
      actors {
        id
      }
      count
      totalCanceled
      totalFinished
    }
  }
`;

const KpiCardGrid = ({ data }) => {
  const { count, totalCanceled, totalFinished } = data;
  const kpiData: Kpi[] = [
    {
      title: 'Users Started',
      metric: count.toString(),
      portion: null,
      deltaType: 'unchanged',
    },
    {
      title: 'Users Finished',
      metric: totalFinished,
      portion: `${Math.round((totalFinished / count) * 100)}%`,
      deltaType: 'increase',
    },
    {
      title: 'Users Canceled',
      metric: totalCanceled,
      portion: `${Math.round((totalCanceled / count) * 100)}%`,
      deltaType: 'decrease',
    },
  ];
  return (
    <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
      {kpiData.map((item, idx) => (
        <KpiCard key={`kpi-${idx}`} item={item} />
      ))}
    </Grid>
  );
};

export const Loading = () => <KpiCard item={{}} loading={true} />;

export const Empty = () => {
  return <></>;
};

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  actorsByJourney,
}: CellSuccessProps<ActorsFromJourney>) => {
  return <KpiCardGrid data={actorsByJourney} />;
};
