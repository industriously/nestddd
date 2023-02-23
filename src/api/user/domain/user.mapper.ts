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
    return { ...model, oauth_type };
  };

  export const toAggregateAsync = asyncUnary(toAggregate);

  export const toPublic: UnaryFunction<
    UserSchema.Aggregate,
    UserSchema.Public
  > = (aggregate) => {
    const { id, email, username } = aggregate;
    return { id, email, username };
  };

  export const toPublicAsync = asyncUnary(toPublic);

  export const toDetail: UnaryFunction<
    UserSchema.Aggregate,
    UserSchema.Detail
  > = (aggregate) => {
    const {
      id,
      sub,
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
      sub,
      oauth_type,
      email,
      username,
      phone,
      address,
      created_at,
      updated_at,
    };
  };
  export const toDetailAsync = asyncUnary(toDetail);
}
