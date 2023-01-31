import { Account } from '@INTERFACE/account';

export namespace ITokenService {
  type JwtPayload = { readonly exp: number; readonly iat: number };
  export type AccessTokenPayload = Pick<Account.State, 'id'>;
  export type IdTokenPayload = Pick<Account.State, 'id' | 'email' | 'username'>;

  export type VerifyTokenResponse = JwtPayload &
    (AccessTokenPayload | IdTokenPayload);
}

export interface ITokenService {
  readonly getAccessToken: (
    payload: ITokenService.AccessTokenPayload,
  ) => string;
  readonly getIdToken: (payload: ITokenService.IdTokenPayload) => string;
  readonly verifyToken: (token: string) => ITokenService.VerifyTokenResponse;
}
