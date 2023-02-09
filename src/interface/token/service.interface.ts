import * as Account from '@INTERFACE/account';

export namespace Service {
  type JwtPayload = { readonly exp: number; readonly iat: number };
  export type AccessTokenPayload = Pick<Account.Domain.State, 'id'>;
  export type IdTokenPayload = Pick<
    Account.Domain.State,
    'id' | 'email' | 'username'
  >;

  export type VerifyTokenResponse = JwtPayload &
    (AccessTokenPayload | IdTokenPayload);
}

export interface Service {
  readonly getAccessToken: (payload: Service.AccessTokenPayload) => string;
  readonly getIdToken: (payload: Service.IdTokenPayload) => string;
  readonly verifyToken: (token: string) => Service.VerifyTokenResponse;
}
