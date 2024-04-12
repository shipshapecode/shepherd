import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const journeys: QueryResolvers['journeys'] = () => {
  return db.journey.findMany({
    orderBy: { updatedAt: 'desc' },
    where: { accountId: context.currentUser.accountId },
  });
};

export const journey: QueryResolvers['journey'] = ({ id }) => {
  return db.journey.findUnique({
    where: { id },
  });
};

export const createJourney: MutationResolvers['createJourney'] = ({
  input,
}) => {
  return db.journey.create({
    data: input,
  });
};

export const updateJourney: MutationResolvers['updateJourney'] = ({
  id,
  input,
}) => {
  return db.journey.update({
    data: input,
    where: { id },
  });
};

export const deleteJourney: MutationResolvers['deleteJourney'] = ({ id }) => {
  return db.journey.delete({
    where: { id },
  });
};

export const findOrCreateJourney = async ({
  input,
}: {
  input: { accountId: string; uniqueId: string };
}) => {
  const existingJourney = await db.journey.findFirst({
    where: {
      AND: [{ accountId: input.accountId }, { uniqueId: input.uniqueId }],
    },
  });

  if (existingJourney) {
    return existingJourney;
  }

  return db.journey.create({
    data: {
      ...input,
    },
  });
};

// TODO: Add back in when we have Steps
// export const Journey: JourneyRelationResolvers = {
//   steps: (_obj, { root }) => {
//     return db.journey.findUnique({ where: { id: root?.id } }).steps();
//   },
// };
