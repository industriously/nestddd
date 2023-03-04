import { IUserRepository } from '@INTERFACE/user';
import { createUser, user_list } from '../data';

export const UserRepository: IUserRepository = {
  async create(data) {
    const user = { ...createUser(), ...data };
    // user_list.push(user);
    return user;
  },
  update(data) {
    return async (_id) => {
      const target = user_list.find(({ id }) => id === _id);
      if (target === undefined) {
        return;
      }
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          (target as any)[key] = value;
        }
      }
      return;
    };
  },
  async findOneByOauth(filter) {
    return (
      user_list.find(
        ({ sub, oauth_type, email }) =>
          (sub === filter.sub && oauth_type === filter.oauth_type) ||
          email === filter.email,
      ) ?? null
    );
  },
  findOne(include_deleted = false) {
    return async (_id) => {
      const user = user_list.find(({ id }) => id === _id);
      if (user == undefined) {
        return null;
      }
      if (include_deleted || !user.is_deleted) {
        return user;
      }
      return null;
    };
  },
  async save(aggregate) {
    const index = user_list.findIndex(({ id }) => id === aggregate.id);
    if (index === -1) {
      return aggregate;
    }
    user_list[index] = aggregate;
    return aggregate;
  },
  async remove() {},
};
