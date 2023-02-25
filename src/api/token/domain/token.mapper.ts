import { UserMapper } from '@USER/domain';
import { TokenSchema } from '@INTERFACE/token';
import { UserSchema } from '@INTERFACE/user';
import { UnaryFunction } from 'rxjs';

export namespace TokenMapper {
  export const toAccessTokenPayload: UnaryFunction<
    UserSchema.Aggregate,
    TokenSchema.AccessTokenPayload
  > = (agg) => {
    return { id: agg.id } satisfies TokenSchema.AccessTokenPayload;
  };

  export const toRefreshTokenPayload: UnaryFunction<
    UserSchema.Aggregate,
    TokenSchema.RefreshTokenPayload
  > = (agg) => {
    return { id: agg.id } satisfies TokenSchema.RefreshTokenPayload;
  };

  export const toIdTokenPayload = UserMapper.toDetail;
}
