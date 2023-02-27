import { HttpExceptionFactory } from '@COMMON/exception';
import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { TokenService } from '@TOKEN';
import { UserUsecase } from '@USER/application';
import typia from 'typia';
import { config, jwtService, userRepository } from './mock';

describe('User Usecase Test', () => {
  const tokenService = new TokenService(jwtService, config);
  const usecase: IUserUsecase = new UserUsecase(tokenService, userRepository);

  // test data
  const test_user: UserSchema.Aggregate = {
    ...typia.random<UserSchema.Aggregate>(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  const access_token = tokenService.getAccessToken(test_user);
  const invalid_tokens = [
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.xz9-9NWa0Sorkil-g_S-CYauW13H83RaM96wVQZDMHROoyAUTO7251fLNZg5CfwvawOlL3csqDq5lR3vnoovHQ1eXIVXECUfy9JbjmQa6OQPCwrmGFmMb_ZvQk2qc_0niAxSZ0rkKQULLDkvBh0UZfUxKgifX9f8XNSnnZZqqBdwRoAAEYxzJ2fBqkLLtsxQR-WedYj38pgyOmCz5LL7BtZ3TndWvwy8FpniP4T91WEhQfhriBVW5jAKUwdXuNlN5D9lVIFLCM0uGHwVdIIHfpqHjo6c6kB2PcFD3LoVsWuEQC1P79j0BZ44muqXyKsaZq3RE3jIi2AZa1XDRgrLaQ',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjh04Izf55HdQY-Wseam08C1p3XvDN_1GgqvUhZVBavDrghKbOqxDQHEkJk56vRJrqJipCQBTEtP14sEHcPf0wnZI14lKmUlcfw35i9K876CLr9nmPBqiiRwGLfjV__rcwGhmHw1eAJCyeRN3DE6D5gBvpl1N2r2ixqIDUwIiyir_5DnHVIrSxkJssQgWh9eUC6uyQGbMAz5VV8Vu7oUk41Ilym2kwCVc9a1pX56dDW75eWrPtuf6ry4gyVLFvqlNe7W4h2o9nrvMmKDzqNKgZO08-DYcwPZftB-pO9kH52SrGarhuXcMWB3II9LM5_bGRY6dG1oFOwKRhTMFkw32A',
  ];
  const test_error = Symbol('Error');

  describe("get user's public data", () => {
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.getPublic(test_user.id);

      await expect(received).rejects.toThrowError(
        HttpExceptionFactory('NotFound'),
      );
    });
    it('If user exist', async () => {
      const received = await usecase.getPublic(test_user.id);

      typia.assertEquals<UserSchema.Public>(received);
    });
  });

  describe("get user's detail data", () => {
    it.each(invalid_tokens)('If token invalid', async (token) => {
      try {
        const received = await usecase.getDetail(token);
        typia.assert<never>(received);
        throw test_error;
      } catch (error) {
        expect(error === test_error).toBe(false);
      }
    });
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.getDetail(access_token);

      await expect(received).rejects.toThrowError(
        HttpExceptionFactory('NotFound'),
      );
    });
    it('If user exist', async () => {
      const received = await usecase.getDetail(access_token);

      typia.assertEquals<UserSchema.Detail>(received);
    });
  });

  describe('update user data', () => {
    it.each(invalid_tokens)('If token invalid', async (token) => {
      try {
        await usecase.update(token, {});
        throw test_error;
      } catch (error) {
        expect(error === test_error).toBe(false);
      }
    });
    it('If token valid', async () => {
      await usecase.update(access_token, {} as IUserUsecase.UpdateData);
    });
  });
  describe('remove user', () => {
    it.each(invalid_tokens)('If token invalid', async (token) => {
      try {
        await usecase.remove(token);
        throw test_error;
      } catch (error) {
        expect(error === test_error).toBe(false);
      }
    });
    it('If token valid', async () => {
      await usecase.remove(access_token);
    });
  });
});
