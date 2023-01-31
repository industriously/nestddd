import { TokenAPI } from '@INTERFACE/token';
import { Account } from '@INTERFACE/account';

export namespace ITokenUsecase {
  export type SignInAccount = Pick<Account.State, 'id'>;
}

export interface ITokenUsecase {
  readonly getToken: (
    account: ITokenUsecase.SignInAccount | undefined,
    oidc: boolean,
  ) => Promise<TokenAPI.Tokens>;
}
