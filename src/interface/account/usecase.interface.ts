import { IProfile } from '@INTERFACE/common';

export namespace IAccountUsecase {
  export interface SignInResponse {
    readonly access_token: string;
    readonly account_id: string;
  }
}

export interface IAccountUsecase {
  readonly signIn: (
    profile: IProfile,
  ) => Promise<IAccountUsecase.SignInResponse>;
}
