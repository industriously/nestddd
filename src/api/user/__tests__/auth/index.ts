import { IConnection } from '@nestia/fetcher';
import { TokenServiceFactory } from '@TOKEN';
import { AuthUsecaseFactory } from '@USER/application';
import { UserBusiness } from '@USER/domain';
import { createUser, user_list } from 'src/api/__tests__/mock/data';
import { config, jwtService } from 'src/api/__tests__/mock/provider';
import { UserRepository } from 'src/api/__tests__/mock/repository';
import { refresh } from './refresh';
import { signIn } from './sign_in';

export namespace TestAuth {
  const tokenService = TokenServiceFactory(jwtService, config);
  const usecase = AuthUsecaseFactory(UserRepository, tokenService);

  const invalid_tokens = [
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.xz9-9NWa0Sorkil-g_S-CYauW13H83RaM96wVQZDMHROoyAUTO7251fLNZg5CfwvawOlL3csqDq5lR3vnoovHQ1eXIVXECUfy9JbjmQa6OQPCwrmGFmMb_ZvQk2qc_0niAxSZ0rkKQULLDkvBh0UZfUxKgifX9f8XNSnnZZqqBdwRoAAEYxzJ2fBqkLLtsxQR-WedYj38pgyOmCz5LL7BtZ3TndWvwy8FpniP4T91WEhQfhriBVW5jAKUwdXuNlN5D9lVIFLCM0uGHwVdIIHfpqHjo6c6kB2PcFD3LoVsWuEQC1P79j0BZ44muqXyKsaZq3RE3jIi2AZa1XDRgrLaQ',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjh04Izf55HdQY-Wseam08C1p3XvDN_1GgqvUhZVBavDrghKbOqxDQHEkJk56vRJrqJipCQBTEtP14sEHcPf0wnZI14lKmUlcfw35i9K876CLr9nmPBqiiRwGLfjV__rcwGhmHw1eAJCyeRN3DE6D5gBvpl1N2r2ixqIDUwIiyir_5DnHVIrSxkJssQgWh9eUC6uyQGbMAz5VV8Vu7oUk41Ilym2kwCVc9a1pX56dDW75eWrPtuf6ry4gyVLFvqlNe7W4h2o9nrvMmKDzqNKgZO08-DYcwPZftB-pO9kH52SrGarhuXcMWB3II9LM5_bGRY6dG1oFOwKRhTMFkw32A',
  ];

  const test_user_list = new Array(10).fill(1).map(createUser);

  export const test_sign_in_google = () => {
    it('If request new user', () => signIn.test_success(usecase)(createUser()));
    it.each(user_list)('If user exist', signIn.test_success(usecase));

    it.each(user_list)('If user is exist, but inactive', async (user) => {
      UserBusiness.inActivate(user);
      await signIn.test_success(usecase)(user);
      expect(UserBusiness.isActive(user)).toBe(true);
    });
  };

  export const test_refresh = (connection: IConnection) => () => {
    it.each(invalid_tokens)(
      'If token invalid',
      refresh.test_invalid_token(connection),
    );

    it.each(test_user_list.map(tokenService.getRefreshToken))(
      'If user not exist',
      refresh.test_user_not_exist(connection),
    );

    it.each(user_list.map(tokenService.getRefreshToken))(
      'If user exist',
      refresh.test_success(connection),
    );
  };
}
