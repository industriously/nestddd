import { IRepository } from '@INTERFACE/common';
import { Account } from './domain.interface';

export namespace IAccountRepository {
  export type CreateData = Readonly<
    Pick<Account.State, 'email' | 'oauth_type' | 'sub' | 'username'>
  >;
  export type FindManyFilter = Readonly<{
    oauth_type: Account.State['oauth_type'];
  }>;
  export type FindOneOrCreateFilter = Readonly<
    Pick<Account.State, 'sub' | 'oauth_type' | 'email'>
  >;
  export type FindOneOrCreateData = Readonly<Pick<Account.State, 'username'>>;
  export type UpdateData = Readonly<Pick<Account.State, 'username'>>;
}

export interface IAccountRepository
  extends IRepository<Account.State, Account.State['id']> {
  readonly create: (
    data: IAccountRepository.CreateData,
  ) => Promise<Account.State>;
  readonly findOneOrCreate: (
    filter: IAccountRepository.FindOneOrCreateFilter,
    data: IAccountRepository.FindOneOrCreateData,
  ) => Promise<Account.State>;
  readonly findMany: (
    filter: IAccountRepository.FindManyFilter,
    include_deleted: boolean,
  ) => Promise<Account.State[]>;
  readonly update: (
    id: Account.State['id'],
    data: IAccountRepository.UpdateData,
  ) => Promise<Account.State>;
}
