import { UserSchema } from '@INTERFACE/user';
import { IConnection } from '@nestia/fetcher';
import { UserBusiness } from '@USER/domain';
import { user_list } from 'src/api/__tests__/mock/data';
import typia from 'typia';
import { getPublic } from './get_public_profile';

export namespace TestUsers {
  const testuser = typia.random<UserSchema.Aggregate>();
  const ids = user_list.map(({ id }) => id);

  export const test_get_public_profile = (connection: IConnection) => () => {
    it.each(ids)('If active user exists', getPublic.test_success(connection));

    it.each([testuser.id, user_list[3].id])(
      'If active user not exists',
      async (id) => {
        // exist user inactivate
        const userIdx = user_list.findIndex(({ id: _id }) => _id === id);
        if (userIdx !== -1) {
          UserBusiness.inActivate(user_list[userIdx]);
        }
        // test
        await getPublic.test_user_not_found(connection)(id);

        // reset
        if (userIdx !== -1) {
          UserBusiness.activate(user_list[userIdx]);
        }
      },
    );

    it.each(['1234', 'afaesew'])(
      'If user_id is not uuid type',
      getPublic.test_invalid_params(connection),
    );
  };
}
