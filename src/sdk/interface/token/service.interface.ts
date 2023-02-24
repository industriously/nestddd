import { UserSchema } from '@INTERFACE/user';

export namespace ITokenService {
  export type AccessTokenPayload = Pick<UserSchema.Aggregate, 'id'>;
  export type RefreshTokenPayload = Pick<UserSchema.Aggregate, 'id'>;

  export type AccessType = 'access';
  export type RefreshType = 'refresh';
  export type TokenType = AccessType | RefreshType;
}

export interface ITokenService {
  readonly getAccessToken: (
    payload: ITokenService.AccessTokenPayload,
  ) => string;
  readonly getRefreshToken: (
    payload: ITokenService.RefreshTokenPayload,
  ) => string;
  readonly getIdToken: (payload: UserSchema.Detail) => string;
  readonly getPayload: <T extends ITokenService.TokenType>(
    token: string,
    token_type?: T,
  ) => ITokenService.AccessType extends T
    ? ITokenService.AccessTokenPayload
    : ITokenService.RefreshTokenPayload;
}
