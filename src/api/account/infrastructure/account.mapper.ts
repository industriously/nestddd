import { Domain } from '@INTERFACE/account';
import { accounts } from '@PRISMA';

export const toAccountState = (model: accounts): Domain.State => {
  const { id, sub, email, oauth_type, username, created_at, updated_at } =
    model;
  return { id, sub, email, oauth_type, username, created_at, updated_at };
};

export const toAccountStateAsync = async (
  model: Promise<accounts>,
): Promise<Domain.State> => {
  return toAccountState(await model);
};
