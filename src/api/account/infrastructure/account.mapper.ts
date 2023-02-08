import * as Account from '@INTERFACE/account';
import { DAOMapper } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export const toAccountState: DAOMapper<Account.Domain.State, accounts> = (
  aggregate,
) => {
  return aggregate;
};
