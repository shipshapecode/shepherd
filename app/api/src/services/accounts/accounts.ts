import type {
  QueryResolvers,
  MutationResolvers,
  AccountRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const accounts: QueryResolvers['accounts'] = () => {
  return db.account.findMany();
};

export const account: QueryResolvers['account'] = ({ id }) => {
  return db.account.findUnique({
    where: { id },
  });
};

export const createAccount: MutationResolvers['createAccount'] = ({
  input,
}) => {
  return db.account.create({
    data: input,
  });
};

export const updateAccount: MutationResolvers['updateAccount'] = ({
  id,
  input,
}) => {
  return db.account.update({
    data: input,
    where: { id },
  });
};

export const deleteAccount: MutationResolvers['deleteAccount'] = ({ id }) => {
  return db.account.delete({
    where: { id },
  });
};

export const Account: AccountRelationResolvers = {
  actors: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).actors();
  },
  journeys: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).journeys();
  },
  metrics: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).metrics();
  },
  // users: (_obj, { root }) => {
  //   return db.account.findUnique({ where: { id: root?.id } }).users();
  // },
};
