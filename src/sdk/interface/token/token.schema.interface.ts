import { Primitive } from 'typia';
import { UserSchema } from '@INTERFACE/user';

export namespace TokenSchema {
  export type AccessTokenPayload = Pick<UserSchema.Aggregate, 'id'>;
  export type RefreshTokenPayload = Pick<UserSchema.Aggregate, 'id'>;
  export type IdTokenPayload = Primitive<UserSchema.Detail>;

  export type AccessType = 'access';
  export type RefreshType = 'refresh';
  export type IdType = 'id';
  export type TokenType = AccessType | RefreshType | IdType;
}
