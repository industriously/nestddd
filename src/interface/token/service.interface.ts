import { Account } from '@INTERFACE/account';

export namespace ITokenService {
  export type AccessTokenPayload = Pick<Account.State, 'id'>;
  export type RefreshTokenPayload = Pick<Account.State, 'id'>;
  export type IdTokenPayload = Pick<Account.State, 'id' | 'email' | 'username'>;
  export type TokenPayload<T extends 'access' | 'refresh'> = T extends 'access'
    ? AccessTokenPayload
    : RefreshTokenPayload;
}

export interface ITokenService {
  readonly getAccessToken: (
    payload: ITokenService.AccessTokenPayload,
  ) => string;
  readonly getRefreshToken: (
    payload: ITokenService.RefreshTokenPayload,
  ) => string;
  readonly getIdToken: (payload: ITokenService.IdTokenPayload) => string;
  readonly verifyToken: <T extends 'access' | 'refresh'>(
    token: string,
  ) => ITokenService.TokenPayload<T>;
}
