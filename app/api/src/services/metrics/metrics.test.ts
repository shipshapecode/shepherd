import type { Metric, Account } from '@prisma/client';

import {
  metrics,
  metric,
  createMetric,
  updateMetric,
  deleteMetric,
} from './metrics';
import type { StandardScenario } from './metrics.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('metrics', () => {
  scenario('returns all metrics', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });
    const result = await metrics();

    expect(result.length).toEqual(Object.keys(scenario.metric).length);
  });

  scenario('returns a single metric', async (scenario: StandardScenario) => {
    const result = await metric({ id: Number(scenario.metric.one.id) });

    expect(result).toEqual(scenario.metric.one);
  });

  scenario('creates a metric', async () => {
    const result = await createMetric({
      input: {
        createdAt: '2024-02-08T19:03:08.724Z',
        value: 'String',
        type: 'EVENT',
      },
    });

    expect(result.createdAt).toEqual(new Date('2024-02-08T19:03:08.724Z'));
    expect(result.value).toEqual('String');
    expect(result.type).toEqual('EVENT');
  });

  scenario('updates a metric', async (scenario: StandardScenario) => {
    const original = (await metric({
      id: Number(scenario.metric.one.id),
    })) as Metric;
    const result = await updateMetric({
      id: original.id,
      input: { type: 'IDENTIFY' },
    });

    expect(result.type).toEqual('IDENTIFY');
  });

  scenario('deletes a metric', async (scenario: StandardScenario) => {
    const original = (await deleteMetric({
      id: Number(scenario.metric.one.id),
    })) as Metric;
    const result = await metric({ id: original.id });

    expect(result).toEqual(null);
  });
});
