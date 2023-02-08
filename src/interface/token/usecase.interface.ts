import { TokenAPI } from '@INTERFACE/token';
import { Domain } from '@INTERFACE/account';

export namespace ITokenUsecase {
  export type SignInAccount = Pick<Domain.State, 'id'>;
}

export interface ITokenUsecase {
  readonly getTokens: (
    account: ITokenUsecase.SignInAccount | undefined,
  ) => Promise<TokenAPI.Tokens>;
  readonly getAccessToken: (
    account: ITokenUsecase.SignInAccount | undefined,
  ) => Promise<TokenAPI.AccessToken>;
}
