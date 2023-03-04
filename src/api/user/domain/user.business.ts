import { UserSchema } from '@INTERFACE/user';
import { Predicate } from '@UTIL';
import { UnaryFunction } from 'rxjs';

export namespace UserBusiness {
  type CheckState = UnaryFunction<UserSchema.Aggregate, boolean>;
  type UpdateState = UnaryFunction<UserSchema.Aggregate, UserSchema.Aggregate>;

  export const isActive: CheckState = (aggregate) => {
    return !aggregate.is_deleted;
  };

  export const isInActive: CheckState = (aggregate) => {
    return Predicate.negate(isActive)(aggregate);
  };

  export const activate: UpdateState = (aggregate) => {
    (aggregate as any).is_deleted = false;
    return aggregate;
  };

  export const inActivate: UpdateState = (aggregate) => {
    (aggregate as any).is_deleted = true;
    return aggregate;
  };
}
