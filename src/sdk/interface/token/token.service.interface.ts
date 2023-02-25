import { UserSchema } from '@INTERFACE/user';
import { TokenSchema } from './token.schema.interface';

export interface ITokenService {
  readonly getAccessToken: (aggregate: UserSchema.Aggregate) => string;
  readonly getRefreshToken: (aggregate: UserSchema.Aggregate) => string;
  readonly getIdToken: (aggregate: UserSchema.Aggregate) => string;
  readonly getAccessTokenPayload: (
    token: string,
  ) => TokenSchema.AccessTokenPayload;
  readonly getRefreshTokenPayload: (
    token: string,
  ) => TokenSchema.RefreshTokenPayload;
  readonly getIdTokenPayload: (token: string) => TokenSchema.IdTokenPayload;
}
