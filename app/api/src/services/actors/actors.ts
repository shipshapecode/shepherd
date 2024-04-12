import type {
  QueryResolvers,
  MutationResolvers,
  ActorRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const actors: QueryResolvers['actors'] = () => {
  return db.actor.findMany({
    where: { accountId: context.currentUser.accountId },
  });
};

export const actorsByJourney = async ({ journeyId }) => {
  const actorsForThisJourney = await db.actor.findMany({
    where: {
      AND: [
        { accountId: context.currentUser.accountId },
        { metrics: { some: { journeyId } } },
      ],
    },
    include: {
      metrics: {
        where: {
          journeyId,
        },
        orderBy: {
          id: 'desc',
        },
      },
    },
  });

  return {
    actors: actorsForThisJourney,
    count: db.actor.count({
      where: {
        AND: [
          { accountId: context.currentUser.accountId },
          { metrics: { some: { journeyId } } },
        ],
      },
    }),
    totalCanceled: db.actor.count({
      where: {
        AND: [
          { accountId: context.currentUser.accountId },
          { metrics: { some: { journeyId } } },
          { metrics: { some: { journeyState: 'CANCEL' } } },
        ],
      },
    }),
    totalFinished: db.actor.count({
      where: {
        AND: [
          { accountId: context.currentUser.accountId },
          { metrics: { some: { journeyId } } },
          { metrics: { some: { journeyState: 'COMPLETE' } } },
        ],
      },
    }),
  };
};

export const actorsListPaginated = ({ page = 1 }) => {
  const ACTORS_PER_PAGE = 50;
  const offset = (page - 1) * ACTORS_PER_PAGE;
  const actors = db.actor.findMany({
    where: {
      AND: [
        { accountId: context.currentUser.accountId },
        { metrics: { some: {} } },
      ],
    },
    include: {
      metrics: {
        orderBy: {
          id: 'desc',
        },
        take: 1, // Only get the latest metric
      },
    },
    take: ACTORS_PER_PAGE,
    skip: offset,
    orderBy: { id: 'desc' },
  });

  return {
    actors,
    count: db.actor.count({
      where: {
        AND: [
          { accountId: context.currentUser.accountId },
          { metrics: { some: {} } },
        ],
      },
    }),
  };
};

export const actorsWithMetrics = () => {
  return db.actor.findMany({
    where: {
      AND: [
        { accountId: context.currentUser.accountId },
        { metrics: { some: {} } },
      ],
    },
    include: {
      metrics: {
        orderBy: {
          id: 'desc',
        },
      },
    },
  });
};

export const actor: QueryResolvers['actor'] = ({ id }) => {
  return db.actor.findUnique({
    where: { id },
    include: {
      metrics: {
        orderBy: {
          id: 'desc',
        },
      },
    },
  });
};

export const createActor: MutationResolvers['createActor'] = ({ input }) => {
  return db.actor.create({
    data: input,
  });
};

export const updateActor: MutationResolvers['updateActor'] = ({
  id,
  input,
}) => {
  return db.actor.update({
    data: input,
    where: { id },
  });
};

export const deleteActor: MutationResolvers['deleteActor'] = ({ id }) => {
  return db.actor.delete({
    where: { id },
  });
};

export const Actor: ActorRelationResolvers = {
  Account: (_obj, { root }) => {
    return db.actor.findUnique({ where: { id: root?.id } }).Account();
  },
  // metrics: (_obj, { root }) => {
  //   return db.actor.findUnique({ where: { id: root?.id } }).metrics();
  // },
};

// non graphql functions
export const createActorFromEvent = ({ input }) => {
  return db.actor.create({
    data: input,
  });
};
