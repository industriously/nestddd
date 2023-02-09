import { IProfile, ISession } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Usecase {
  export type SignInResponse = Pick<Domain.State, 'id'>;
  export type Public = Pick<Domain.State, 'id' | 'email' | 'username'>;
  export type Detail = Domain.State;

  export type SetProfileData = Pick<Domain.State, 'username'>;
}

export interface Usecase {
  readonly signIn: (profile: IProfile) => Promise<Usecase.SignInResponse>;
  readonly getProfile: (
    account: ISession['account'],
  ) => Promise<Usecase.Detail>;
  readonly getPublicProfile: () => Promise<Usecase.Public>;
  readonly setProfile: (
    account: ISession['account'],
    data: Usecase.SetProfileData,
  ) => Promise<void>;
  readonly deleteAccount: (account: ISession['account']) => Promise<void>;
}
