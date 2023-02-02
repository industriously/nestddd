import { TokenAPI } from '@INTERFACE/token';
import { Account } from '@INTERFACE/account';

export namespace ITokenUsecase {
  export type SignInAccount = Pick<Account.State, 'id'>;
}

export interface ITokenUsecase {
  readonly getTokens: (
    account: ITokenUsecase.SignInAccount | undefined,
  ) => Promise<TokenAPI.Tokens>;
  readonly getAccessToken: (
    account: ITokenUsecase.SignInAccount | undefined,
  ) => Promise<TokenAPI.AccessToken>;
}
