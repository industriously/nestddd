import { HttpExceptionFactory } from '@COMMON/exception';
import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import { TokenService } from '@TOKEN';
import { AuthUsecase } from '@USER/application';
import { UserBusiness } from '@USER/domain';
import typia from 'typia';
import { config, jwtService, userRepository } from './mock';

describe('Authentication Usecase Test', () => {
  const tokenService = new TokenService(jwtService, config);
  const usecase: IAuthUsecase = new AuthUsecase(userRepository, tokenService);

  // test data
  const test_error = Symbol('Error');
  const agg = typia.random<UserSchema.Aggregate>();
  const refresh_token = tokenService.getRefreshToken({
    ...agg,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const invalid_tokens = [
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.xz9-9NWa0Sorkil-g_S-CYauW13H83RaM96wVQZDMHROoyAUTO7251fLNZg5CfwvawOlL3csqDq5lR3vnoovHQ1eXIVXECUfy9JbjmQa6OQPCwrmGFmMb_ZvQk2qc_0niAxSZ0rkKQULLDkvBh0UZfUxKgifX9f8XNSnnZZqqBdwRoAAEYxzJ2fBqkLLtsxQR-WedYj38pgyOmCz5LL7BtZ3TndWvwy8FpniP4T91WEhQfhriBVW5jAKUwdXuNlN5D9lVIFLCM0uGHwVdIIHfpqHjo6c6kB2PcFD3LoVsWuEQC1P79j0BZ44muqXyKsaZq3RE3jIi2AZa1XDRgrLaQ',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjh04Izf55HdQY-Wseam08C1p3XvDN_1GgqvUhZVBavDrghKbOqxDQHEkJk56vRJrqJipCQBTEtP14sEHcPf0wnZI14lKmUlcfw35i9K876CLr9nmPBqiiRwGLfjV__rcwGhmHw1eAJCyeRN3DE6D5gBvpl1N2r2ixqIDUwIiyir_5DnHVIrSxkJssQgWh9eUC6uyQGbMAz5VV8Vu7oUk41Ilym2kwCVc9a1pX56dDW75eWrPtuf6ry4gyVLFvqlNe7W4h2o9nrvMmKDzqNKgZO08-DYcwPZftB-pO9kH52SrGarhuXcMWB3II9LM5_bGRY6dG1oFOwKRhTMFkw32A',
  ];

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

  describe('refresh token', () => {
    it.each(invalid_tokens)('If token invalid', async (token) => {
      try {
        const received = await usecase.refresh(token);
        typia.assert<never>(received);
        throw test_error;
      } catch (error) {
        expect(error === test_error).toBe(false);
      }
    });
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.refresh(refresh_token);

      await expect(received).rejects.toThrowError(
        HttpExceptionFactory('NotFound'),
      );
    });
    it('If user exist', async () => {
      const received = await usecase.refresh(refresh_token);
      typia.assertEquals(received);
    });
  });
});
