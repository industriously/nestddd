import { IProfile } from '@INTERFACE/common';
import { UserDomain } from './user.domain.interface';

export namespace IUserService {}

export interface IUserService {
  readonly findOne: (id: UserDomain.State['id']) => Promise<UserDomain.State>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<UserDomain.State>;
}
