import { IProfile } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export namespace IAccountUsecase {
  export interface SignInResponse {
    readonly access_token: string;
    readonly account_id: accounts['id'];
  }
}

export interface IAccountUsecase {
  readonly signIn: (
    profile: IProfile,
  ) => Promise<IAccountUsecase.SignInResponse>;
}
