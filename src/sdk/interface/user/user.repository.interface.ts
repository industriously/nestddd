import { IRepository } from '@INTERFACE/common';
import { UserSchema } from './user.schema.interface';

export namespace IUserRepository {
  export type CreateData = Pick<
    UserSchema.Aggregate,
    'sub' | 'oauth_type' | 'email' | 'username'
  >;
  export type UpdatableData = Pick<
    UserSchema.Aggregate,
    'address' | 'email' | 'is_deleted' | 'phone' | 'username'
  >;

  export type UpdateData = Partial<Omit<UpdatableData, 'is_deleted'>>;

  export type FindOneByOauthFilter = Pick<
    UserSchema.Aggregate,
    'sub' | 'oauth_type' | 'email'
  >;
}

export interface IUserRepository
  extends IRepository<UserSchema.Aggregate, string> {
  readonly create: (
    data: IUserRepository.CreateData,
  ) => Promise<UserSchema.Aggregate>;
  readonly update: (
    data: IUserRepository.UpdateData,
  ) => (id: string) => Promise<void>;
  readonly findOneByOauth: (
    filter: IUserRepository.FindOneByOauthFilter,
  ) => Promise<UserSchema.Aggregate | null>;
}
