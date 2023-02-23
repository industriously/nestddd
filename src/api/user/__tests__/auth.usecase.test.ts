import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import { AuthUsecase } from '@USER/application';
import { UserBusiness } from '@USER/domain';
import typia from 'typia';
import { userRepository } from './user.repository.mock';

describe('Authentication Usecase Test', () => {
  const usecase: IAuthUsecase = new AuthUsecase(userRepository);

  describe('sign in service', () => {
    const profile = typia.random<UserSchema.OauthProfile>();
    it('If actor is new user', async () => {
      const spyOnFindOneByOuath = jest.spyOn(userRepository, 'findOneByOauth');
      const spyOnCreate = jest.spyOn(userRepository, 'create');
      const spyOnSave = jest.spyOn(userRepository, 'save');
      spyOnFindOneByOuath.mockImplementationOnce(async () => null);

      const received = await usecase.signIn(profile);

      typia.assertEquals<IAuthUsecase.SignInResponse>(received);
      expect(spyOnCreate).toBeCalled();
      expect(spyOnSave).not.toBeCalled();
    });

    it('If actor is existing user', async () => {
      const spyOnCreate = jest.spyOn(userRepository, 'create');
      const spyOnSave = jest.spyOn(userRepository, 'save');

      const received = await usecase.signIn(profile);

      typia.assertEquals<IAuthUsecase.SignInResponse>(received);
      expect(spyOnCreate).not.toBeCalled();
      expect(spyOnSave).toBeCalled();
    });

    it('If actor is existing user, but inactive.', async () => {
      // create test data
      const random_user = typia.random<UserSchema.Aggregate>();
      const now = new Date();
      const user: UserSchema.Aggregate = {
        ...random_user,
        ...profile,
        created_at: now,
        updated_at: now,
        is_deleted: true,
      };

      // mocking
      const spyOnFindOneByOuath = jest.spyOn(userRepository, 'findOneByOauth');
      const spyOnCreate = jest.spyOn(userRepository, 'create');
      const spyOnSave = jest.spyOn(userRepository, 'save');
      spyOnFindOneByOuath.mockResolvedValueOnce(user);

      const received = await usecase.signIn(profile);

      typia.assertEquals<IAuthUsecase.SignInResponse>(received);
      expect(spyOnCreate).not.toBeCalled();
      expect(spyOnSave).toBeCalled();
      expect(UserBusiness.isInActive(user)).toBe(false);
    });
  });
});
