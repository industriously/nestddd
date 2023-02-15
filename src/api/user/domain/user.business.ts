import { UserSchema } from '@INTERFACE/user';

export namespace UserBusiness {
  export const isActive = (aggregate: UserSchema.Aggregate): boolean => {
    return !aggregate.is_deleted;
  };

  export const isInActive = (aggregate: UserSchema.Aggregate): boolean => {
    return aggregate.is_deleted;
  };
}
