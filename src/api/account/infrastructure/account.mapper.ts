import { Domain } from '@INTERFACE/account';
import { DAOMapper } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export const toAccountState: DAOMapper<accounts, Domain.State> = (model) => {
  const { id, sub, email, oauth_type, username, created_at, updated_at } =
    model;
  return { id, sub, email, oauth_type, username, created_at, updated_at };
};
