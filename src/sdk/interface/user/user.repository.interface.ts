import { IRepository } from '@INTERFACE/common';
import { UserSchema } from './user.schema.interface';

export namespace IUserRepository {
  export type CreateData = Pick<
    UserSchema.Aggregate,
    'sub' | 'oauth_type' | 'email' | 'username'
  >;
  export type UpdateData = Partial<
    Pick<
      UserSchema.Aggregate,
      'email' | 'username' | 'address' | 'phone' | 'is_deleted'
    >
  >;
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
    id: string,
    data: IUserRepository.UpdateData,
  ) => Promise<void>;
  readonly findOneByOauth: (
    filter: IUserRepository.FindOneByOauthFilter,
  ) => Promise<UserSchema.Aggregate | null>;
}
