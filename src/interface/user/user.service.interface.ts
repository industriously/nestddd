import { IProfile } from '@INTERFACE/common';
import { UserDomain } from './user.domain.interface';

export namespace IUserService {
  export type UpdateData = Partial<
    Pick<UserDomain.State, 'address' | 'email' | 'phone' | 'username'>
  >;
}

export interface IUserService {
  readonly findOne: (id: UserDomain.State['id']) => Promise<UserDomain.State>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<UserDomain.State>;
  readonly activate: {
    (id: UserDomain.State['id']): Promise<UserDomain.State>;
    (state: UserDomain.State): Promise<UserDomain.State>;
  };
  readonly update: (
    id: UserDomain.State['id'],
    data: IUserService.UpdateData,
  ) => Promise<UserDomain.State>;

  readonly remove: (id: UserDomain.State['id']) => Promise<void>;
}
