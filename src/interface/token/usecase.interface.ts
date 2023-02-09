import { ISession } from '@INTERFACE/common';

export namespace Usecase {
  export interface AccessToken {
    readonly access_token: string;
  }
  export interface Tokens extends AccessToken {
    readonly id_token: string;
  }
}

export interface Usecase {
  readonly getTokens: (account: ISession['account']) => Promise<Usecase.Tokens>;
  readonly getAccessToken: (
    account: ISession['account'],
  ) => Promise<Usecase.AccessToken>;
}
