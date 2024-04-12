import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany({
    where: { accountId: context.currentUser.accountId },
  });
};

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  });
};

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  });
};

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  });
};

export const User: UserRelationResolvers = {
  Account: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Account();
  },
  accountId: async (_obj, { root }) => {
    const Account = await db.user
      .findUnique({ where: { id: root?.id } })
      .Account();

    return Account.id;
  },
};
