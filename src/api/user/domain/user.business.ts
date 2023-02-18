import { UserSchema } from '@INTERFACE/user';
import { Predicate } from '@UTIL';

export namespace UserBusiness {
  export const isActive = (aggregate: UserSchema.Aggregate): boolean => {
    return !aggregate.is_deleted;
  };

  export const isInActive = (aggregate: UserSchema.Aggregate): boolean => {
    return Predicate.negate(isActive)(aggregate);
  };
}
