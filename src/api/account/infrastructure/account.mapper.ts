import { Account } from '@INTERFACE/account';
import { IEntityMapper } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export const AccountMapper: IEntityMapper<Account.State, accounts> = {
  toAggregate(model) {
    throw new Error('Function not implemented.');
  },
  toModel(aggregate) {
    throw new Error('Function not implemented.');
  },
};
