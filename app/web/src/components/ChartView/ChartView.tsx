import { useState } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { AreaChart, Color, Card, Flex, Icon, Text, Title } from '@tremor/react';

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat('us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const ChartView = () => {
  const formatters: { [key: string]: unknown } = {
    Sales: (number: number) => `$ ${usNumberformatter(number)}`,
    Profit: (number: number) => `$ ${usNumberformatter(number)}`,
    Customers: (number: number) => `${usNumberformatter(number)}`,
    Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
  };
  const Kpis = {
    Journeys: 'Journeys',
    Completed: 'Completed',
    Users: 'Users',
  };

  const kpiList = [Kpis.Journeys, Kpis.Completed, Kpis.Users];

  type DailyPerformance = {
    date: string;
    Journeys: number;
    Completed: number;
    Users: number;
  };

  const performance: DailyPerformance[] = [
    {
      date: '2023-05-01',
      Journeys: 900,
      Completed: 173,
      Users: 73,
    },
    {
      date: '2023-05-02',
      Journeys: 1000,
      Completed: 174,
      Users: 74,
    },
    {
      date: '2023-05-03',
      Journeys: 1100,
      Completed: 293,
      Users: 293,
    },
    {
      date: '2023-05-04',
      Journeys: 1200,
      Completed: 290,
      Users: 29,
    },
  ];
  const [selectedIndex, _setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];

  const areaChartArgs = {
    className: 'mt-5 h-72',
    data: performance,
    index: 'date',
    categories: [selectedKpi],
    colors: ['pink'] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 60,
  };

  return (
    <Card className="order-2 flex flex-col rounded-md border-[1.2px] border-black pt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="justify-between md:flex">
        <div>
          <Flex
            className="space-x-0.5"
            justifyContent="start"
            alignItems="center"
          >
            <Title className="font-bold"> Journey Usage History </Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Shows daily increase or decrease"
            />
          </Flex>
          <Text> Per day usage </Text>
        </div>
        <div>
          {/* <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList color="gray" variant="solid">
              <Tab>Sales</Tab>
              <Tab>Profit</Tab>
              <Tab>Customers</Tab>
            </TabList>
          </TabGroup> */}
        </div>
      </div>
      {/* web */}
      <div className="mt-8 hidden sm:block">
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      {/* <div className="mt-8 sm:hidden">
        <AreaChart
          {...areaChartArgs}
          startEndOnly={true}
          showGradient={false}
          showYAxis={false}
        />
      </div> */}
    </Card>
  );
};

export default ChartView;
