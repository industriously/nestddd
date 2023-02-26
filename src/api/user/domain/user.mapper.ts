import { UserSchema } from '@INTERFACE/user';
import { User } from '@PRISMA';
import { UnaryFunction } from 'rxjs';
import { asyncUnary } from '@UTIL';

export namespace UserMapper {}

export namespace UserMapper {
  export const toAggregate: UnaryFunction<User, UserSchema.Aggregate> = (
    model,
  ) => {
    const oauth_type = model.oauth_type as UserSchema.OauthType;
    return { ...model, oauth_type } satisfies UserSchema.Aggregate;
  };

  export const toAggregateAsync = asyncUnary(toAggregate);

  export const toPublic: UnaryFunction<
    UserSchema.Aggregate,
    UserSchema.Public
  > = (aggregate) => {
    const { id, email, username } = aggregate;
    return { id, email, username } satisfies UserSchema.Public;
  };

  export const toPublicAsync = asyncUnary(toPublic);

  export const toDetail: UnaryFunction<
    UserSchema.Aggregate,
    UserSchema.Detail
  > = (aggregate) => {
    const {
      id,
      oauth_type,
      email,
      username,
      phone,
      address,
      created_at,
      updated_at,
    } = aggregate;
    return {
      id,
      oauth_type,
      email,
      username,
      phone,
      address,
      created_at: created_at.toISOString(),
      updated_at: updated_at.toISOString(),
    } satisfies UserSchema.Detail;
  };
  export const toDetailAsync = asyncUnary(toDetail);
}