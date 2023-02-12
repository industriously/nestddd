import { IRepository } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Repository {
  type OauthType = { readonly oauth_type: Domain.OauthType };

  export type CreateData = Pick<
    Domain.State,
    'email' | 'sub' | 'oauth_type' | 'username'
  >;

  export type FindManyFilter = OauthType;

  export type FindOneOrCreateFilter = Pick<Domain.State, 'sub' | 'email'> &
    OauthType;

  export type FindOneOrCreateData = Pick<Domain.State, 'username'>;
  export interface UpdateData extends Partial<Pick<Domain.State, 'username'>> {
    readonly is_deleted?: false;
  }
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
