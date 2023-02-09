import * as Account from '@INTERFACE/account';
import { API } from '@INTERFACE/token';

export namespace Usecase {
  export type SignInAccount = Pick<Account.Domain.State, 'id'>;
}

export interface Usecase {
  readonly getTokens: (
    account: Usecase.SignInAccount | undefined,
  ) => Promise<API.Tokens>;
  readonly getAccessToken: (
    account: Usecase.SignInAccount | undefined,
  ) => Promise<API.AccessToken>;
}
