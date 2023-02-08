import { IRepository } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Repository {
  export type CreateData = Readonly<
    Pick<Domain.State, 'email' | 'oauth_type' | 'sub' | 'username'>
  >;
  export type FindManyFilter = Readonly<{
    oauth_type: Domain.State['oauth_type'];
  }>;
  export type FindOneOrCreateFilter = Readonly<
    Pick<Domain.State, 'sub' | 'oauth_type' | 'email'>
  >;
  export type FindOneOrCreateData = Readonly<Pick<Domain.State, 'username'>>;
  export type UpdateData = Readonly<Pick<Domain.State, 'username'>>;
}

export interface Repository
  extends IRepository<Domain.State, Domain.State['id']> {
  readonly create: (data: Repository.CreateData) => Promise<Domain.State>;
  readonly findOneOrCreate: (
    filter: Repository.FindOneOrCreateFilter,
    data: Repository.FindOneOrCreateData,
  ) => Promise<Domain.State>;
  readonly findMany: (
    filter: Repository.FindManyFilter,
    include_deleted: boolean,
  ) => Promise<Domain.State[]>;
  readonly update: (
    id: Domain.State['id'],
    data: Repository.UpdateData,
  ) => Promise<Domain.State>;
}
