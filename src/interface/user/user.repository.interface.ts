import { IRepository } from '@INTERFACE/common';
import { UserDomain } from './user.domain.interface';

export namespace IUserRepository {
  export type CreateData = Pick<
    UserDomain.State,
    'email' | 'sub' | 'oauth_type' | 'username'
  >;

  export type UpdateData = Pick<UserDomain.State, 'username'>;
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
}
