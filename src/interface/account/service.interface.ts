import { IProfile } from '@INTERFACE/common';
import { Account } from './domain.interface';

export namespace IAccountService {
  export type FindOneFilter = Pick<Account.State, 'id'>;
}

export interface IAccountService {
  readonly findOne: (
    filter: IAccountService.FindOneFilter,
  ) => Promise<Account.State>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<Account.State>;
}
