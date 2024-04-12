import type { MetricsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query MetricsQuery {
    metrics {
      id
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({ metrics }: CellSuccessProps<MetricsQuery>) => {
  return (
    <ul>
      {metrics.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>;
      })}
    </ul>
  );
};
