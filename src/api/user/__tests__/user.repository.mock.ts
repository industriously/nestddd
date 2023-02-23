import { IUserRepository, UserSchema } from '@INTERFACE/user';
import typia from 'typia';

export const userRepository: IUserRepository = {
  async create(data) {
    const user = typia.random<UserSchema.Aggregate>();
    const now = new Date();
    return { ...user, ...data, created_at: now, updated_at: now };
  },
  async update() {},
  async findOneByOauth(filter) {
    const user = typia.random<UserSchema.Aggregate>();
    const now = new Date();
    return { ...user, ...filter, created_at: now, updated_at: now };
  },
  async findOne(id, include_deleted = false) {
    const user = typia.random<UserSchema.Aggregate>();
    const now = new Date();
    return {
      ...user,
      id,
      is_deleted: include_deleted,
      created_at: now,
      updated_at: now,
    };
  },
  async save(aggregate) {
    return aggregate;
  },
  async remove() {},
};
