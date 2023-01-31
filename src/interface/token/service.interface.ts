import { Account } from '@INTERFACE/account';

export namespace ITokenService {
  export type AccessTokenPayload = Pick<Account.State, 'id'>;
  export type IdTokenPayload = Pick<Account.State, 'id' | 'email' | 'username'>;
}

export interface ITokenService {
  readonly getAccessToken: (
    payload: ITokenService.AccessTokenPayload,
  ) => string;
  readonly getIdToken: (payload: ITokenService.IdTokenPayload) => string;
  readonly verifyToken: (
    token: string,
  ) => ITokenService.AccessTokenPayload | ITokenService.IdTokenPayload;
}
