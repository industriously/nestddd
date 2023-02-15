import { UserSchema } from './user.schema.interface';

export namespace IUserService {}

export interface IUserService {
  readonly activate: (
    aggregate: UserSchema.Aggregate,
  ) => Promise<UserSchema.Aggregate>;

  readonly inActivate: (
    aggregate: UserSchema.Aggregate,
  ) => Promise<UserSchema.Aggregate>;
}
