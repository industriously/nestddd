import { IRepository } from '@INTERFACE/common';
import { UserDomain } from './user.domain.interface';

export namespace IUserRepository {
  interface OauthType {
    readonly oauth_type: UserDomain.OauthType;
  }
  export type CreateData = Pick<
    UserDomain.State,
    'email' | 'sub' | 'oauth_type' | 'username'
  >;

  export type UpdateData = Partial<
    Pick<
      UserDomain.State,
      'email' | 'username' | 'address' | 'phone' | 'is_deleted'
    >
  >;

  export type findOneByEmailOrOauthFilter = Pick<
    UserDomain.State,
    'sub' | 'email'
  > &
    OauthType;
}

export interface IUserRepository
  extends IRepository<UserDomain.State, UserDomain.State['id']> {
  readonly create: (
    data: IUserRepository.CreateData,
  ) => Promise<UserDomain.State>;
  readonly update: (
    id: UserDomain.State['id'],
    data: IUserRepository.UpdateData,
  ) => Promise<UserDomain.State>;

  readonly findOneByEmailOrOauth: (
    filter: IUserRepository.findOneByEmailOrOauthFilter,
  ) => Promise<UserDomain.State | null>;
}
