import { UserSchema } from '@INTERFACE/user';
import typia from 'typia';

const created_at = new Date();
const updated_at = created_at;
export const createUser = (): UserSchema.Aggregate => {
  const primitive = typia.random<UserSchema.Aggregate>();
  return {
    ...primitive,
    is_deleted: false,
    created_at,
    updated_at,
  };
};

export const user_list: UserSchema.Aggregate[] = new Array(10)
  .fill(1)
  .map(createUser);
