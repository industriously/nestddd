import { FxUtil } from '@COMMON/util';
import { UserSchema } from '@INTERFACE/user';
import { User } from '@PRISMA';
import typia from 'typia';

export namespace UserMapper {
  export const toAggregate: FxUtil.UnaryFunction<User, UserSchema.Aggregate> = (
    model,
  ) => {
    return typia.assertEquals<UserSchema.Aggregate>(model);
  };

  export const toAggregateAsync: FxUtil.AsyncUnary<typeof toAggregate> = async (
    model,
  ) => toAggregate(await model);

  export const toPublic: FxUtil.UnaryFunction<
    UserSchema.Aggregate,
    UserSchema.Public
  > = (aggregate) => {
    const { id, email, username } = aggregate;
    return { id, email, username };
  };

  export const toPublicAsync: FxUtil.AsyncUnary<typeof toPublic> = async (
    aggregate,
  ) => toPublic(await aggregate);

  export const toDetail: FxUtil.UnaryFunction<
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
  export const toDetailAsync: FxUtil.AsyncUnary<typeof toDetail> = async (
    aggregate,
  ) => toDetail(await aggregate);
}
