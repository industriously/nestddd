import { TokenAPI } from '@INTERFACE/token';
import { Account } from '@INTERFACE/account';

export namespace ITokenUsecase {
  export type SignInAccount = Pick<Account.State, 'id'>;
}

export interface ITokenUsecase {
  readonly getCredentials: (
    account: ITokenUsecase.SignInAccount | undefined,
  ) => Promise<TokenAPI.Credentials>;
  readonly refreshToken: (
    account: ITokenUsecase.SignInAccount | undefined,
    refresh_token: string,
  ) => Promise<TokenAPI.AccessToken>;
}
