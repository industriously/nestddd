import { UserMapper } from '@USER/domain';
import { TokenSchema } from '@INTERFACE/token';
import { UserSchema } from '@INTERFACE/user';
import { UnaryFunction } from 'rxjs';

export namespace TokenMapper {
  export const toAccessTokenPayload: UnaryFunction<
    UserSchema.Aggregate,
    TokenSchema.AccessTokenPayload
  > = (agg) => {
    return { id: agg.id };
  };

  export const toRefreshTokenPayload: UnaryFunction<
    UserSchema.Aggregate,
    TokenSchema.RefreshTokenPayload
  > = (agg) => {
    return { id: agg.id };
  };

  export const toIdTokenPayload = UserMapper.toDetail;
}
