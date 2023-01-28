import { IProfile } from '@INTERFACE/common';
import { Account } from './domain.interface';

export namespace IAccountUsecase {
  export type SignInResponse = Pick<Account.State, 'id'>;
}

export interface IAccountUsecase {
  readonly signIn: (
    profile: IProfile,
  ) => Promise<IAccountUsecase.SignInResponse>;
}
