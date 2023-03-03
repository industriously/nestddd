import { UserMapper } from '@USER/domain';
import { map, pipeAsync } from '@UTIL';
import { IUserRepository, UserSchema } from '@INTERFACE/user';
import typia from 'typia';
import { DBClient } from '@INTERFACE/common';
import { pipe } from 'rxjs';

export const UserRepositoryFactory = (client: DBClient): IUserRepository => {
  const user = () => client.get().user;
  return {
    create(data) {
      return pipeAsync(
        // validate input
        typia.createAssertPrune<IUserRepository.CreateData>(),
        // create user
        (data) => user().create({ data }),
        // transform to aggregate
        UserMapper.toAggregate,
      )(data);
    },

    findOne(include_deleted = false) {
      return pipeAsync(
        // validate input
        (id: string) => typia.assert(id),
        // find active user by id
        (id) =>
          user().findFirst({
            where: { id, is_deleted: include_deleted ? undefined : false },
          }),
        // if user exist, transform to aggregate
        map(UserMapper.toAggregate),
      );
    },

    findOneByOauth(filter) {
      return pipeAsync(
        // validate input
        typia.createAssertPrune<IUserRepository.FindOneByOauthFilter>(),
        // find user by oauth data or email
        ({ sub, oauth_type, email }) =>
          user().findFirst({ where: { OR: [{ email }, { sub, oauth_type }] } }),
        // if user exist, transform to aggregate
        map(UserMapper.toAggregate),
      )(filter);
    },

    update(_data) {
      // validate update data
      const data = typia.assertPrune(_data);
      // curring function
      return pipe<string, string, Promise<void>>(
        // validate id
        typia.createAssert<string>(),
        // update active user, and return none
        async (id) => {
          await user().updateMany({ where: { id, is_deleted: false }, data });
        },
      );
    },

    save(aggregate) {
      return pipe(
        // valiate input
        typia.createAssertPrune<UserSchema.Aggregate>(),
        // extract id & updatable data, and save input(user)
        // return input(user)
        async (aggregate) => {
          const { id, address, email, is_deleted, phone, username } = aggregate;
          await user().updateMany({
            where: { id },
            data: { address, email, is_deleted, phone, username },
          });
          return aggregate;
        },
      )(aggregate);
    },

    remove(id) {
      return pipe(
        // validate input
        typia.createAssert<string>(),
        // inactivate user, and return none(void)
        async (id) => {
          await user().updateMany({
            where: { id },
            data: { is_deleted: false },
          });
        },
      )(id);
    },
  };
};
