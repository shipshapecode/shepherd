import {
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Metric,
  // ProgressBar,
  Text,
} from '@tremor/react';
import LoadingSpinner from '@tremor/react/dist/assets/LoadingSpinner';

export type Kpi = {
  title: string;
  metric: string;
  portion: string | null;
  // target: string;
  // delta: string;
  deltaType: DeltaType;
};

const KpiCard = ({
  item,
  loading = false,
}: {
  item: Kpi | Record<string, string | number | null>;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <Card
        decoration=""
        className="order-2 flex flex-col items-center justify-center rounded-md border-[1.2px] border-black pt-4"
      >
        {' '}
        <div className="truncate font-bold">
          <Text>{item.title}</Text>
        </div>
        <LoadingSpinner
          className={'items-centerh-8 w-8 shrink-0 animate-spin'}
        />
      </Card>
    );
  }
  return (
    <Card
      decoration=""
      key={item.title}
      className="order-2 flex flex-col rounded-md border-[1.2px] border-black pt-4"
    >
      <Flex alignItems="start">
        <div className="truncate">
          <Text className="font-bold">{item.title}</Text>
        </div>
        <BadgeDelta deltaType={item.deltaType}></BadgeDelta>
      </Flex>
      <Flex className="mt-6 space-x-2">
        <Metric className="truncate text-lg">{item.metric}</Metric>
        {/* <Text className="truncate">{item.target}</Text> */}
        {item.portion && <Text className="text-lg">{item.portion}</Text>}
      </Flex>
      {/* <ProgressBar value={item.progress} className="mt-2" /> */}
    </Card>
  );
};

export default KpiCard;
