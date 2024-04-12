import type {
  QueryResolvers,
  MutationResolvers,
  MetricRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
// import { logger } from 'src/lib/logger';

// interface ValueField {
//   journeyData: JourneyData;
// }

// interface JourneyData {
//   id: string;
//   currentStep: number;
//   numberOfSteps: number;
//   // tourOptions
// }

export const metrics: QueryResolvers['metrics'] = () => {
  return db.metric.findMany({
    where: { accountId: context.currentUser.accountId },
  });
};

export const metric: QueryResolvers['metric'] = ({ id }) => {
  return db.metric.findUnique({
    where: { id },
  });
};

export const createMetric: MutationResolvers['createMetric'] = ({ input }) => {
  return db.metric.create({
    data: input,
  });
};

export const updateMetric: MutationResolvers['updateMetric'] = ({
  id,
  input,
}) => {
  return db.metric.update({
    data: input,
    where: { id },
  });
};

export const deleteMetric: MutationResolvers['deleteMetric'] = ({ id }) => {
  return db.metric.delete({
    where: { id },
  });
};

export const Metric: MetricRelationResolvers = {
  // journeyId: async (_obj, { root }) => {
  //   // @ts-expect-error
  //   return (root.value as ValueField).journeyData.id;
  // },
  journeyId: async (_obj, { root }) => {
    const Journey = await db.metric
      .findUnique({ where: { id: root?.id } })
      .Journey();

    return Journey.id;
  },
};
