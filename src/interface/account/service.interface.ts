import { IProfile } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export namespace IAccountService {
  export type FindOneFilter =
    | Pick<accounts, 'id'>
    | Pick<accounts, 'sub' | 'oauth_type'>;
}

export interface IAccountService {
  readonly findOne: (
    filter: IAccountService.FindOneFilter,
  ) => Promise<accounts>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<accounts>;
}
