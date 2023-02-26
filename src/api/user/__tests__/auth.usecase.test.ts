import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import { TokenService } from '@TOKEN';
import { AuthUsecase } from '@USER/application';
import { UserBusiness } from '@USER/domain';
import typia from 'typia';
import { config, jwtService, userRepository } from './mock';

describe('Authentication Usecase Test', () => {
  const tokenService = new TokenService(jwtService, config);
  const usecase: IAuthUsecase = new AuthUsecase(userRepository, tokenService);

  describe('sign in service', () => {
    const profile = typia.random<UserSchema.OauthProfile>();
    it('If actor is new user', async () => {
      const spyOnFindOneByOuath = jest.spyOn(userRepository, 'findOneByOauth');
      const spyOnCreate = jest.spyOn(userRepository, 'create');
      const spyOnSave = jest.spyOn(userRepository, 'save');
      spyOnFindOneByOuath.mockImplementationOnce(async () => null);

      const received = await usecase.signIn(profile);

      typia.assertEquals<IAuthUsecase.SignInResponse>(received);
      expect(spyOnCreate).toBeCalledTimes(1);
      expect(spyOnSave).toBeCalledTimes(0);
    });

    it('If actor is existing user', async () => {
      const spyOnCreate = jest.spyOn(userRepository, 'create');
      const spyOnSave = jest.spyOn(userRepository, 'save');

      const received = await usecase.signIn(profile);

      typia.assertEquals<IAuthUsecase.SignInResponse>(received);
      expect(spyOnCreate).toBeCalledTimes(0);
      expect(spyOnSave).toBeCalledTimes(0);
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
      expect(spyOnCreate).toBeCalledTimes(0);
      expect(spyOnSave).toBeCalledTimes(1);
      expect(UserBusiness.isInActive(user)).toBe(false);
    });
  });
});