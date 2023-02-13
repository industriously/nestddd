import { UserSchema } from '@INTERFACE/user';

export class UserBusinessDI {
  async activate(aggregate: UserSchema.Aggregate): Promise<void> {}

  async inActivate(aggregate: UserSchema.Aggregate): Promise<void> {}
}
