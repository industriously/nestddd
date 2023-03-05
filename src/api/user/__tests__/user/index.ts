import { IUserUsecase } from '@INTERFACE/user';
import { IConnection } from '@nestia/fetcher';
import { TokenServiceFactory } from '@TOKEN';
import typia from 'typia';
import { createUser, user_list } from 'src/api/__tests__/mock/data';
import { config, jwtService } from 'src/api/__tests__/mock/provider';
import { getProfile } from './get_profile';
import { updateProfile } from './update_profile';
import { inActivate } from './inactivate';

export namespace TestUser {
  const tokenService = TokenServiceFactory(jwtService, config);
  const valid_tokens = user_list.map(tokenService.getAccessToken);
  const invalid_tokens = [
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.xz9-9NWa0Sorkil-g_S-CYauW13H83RaM96wVQZDMHROoyAUTO7251fLNZg5CfwvawOlL3csqDq5lR3vnoovHQ1eXIVXECUfy9JbjmQa6OQPCwrmGFmMb_ZvQk2qc_0niAxSZ0rkKQULLDkvBh0UZfUxKgifX9f8XNSnnZZqqBdwRoAAEYxzJ2fBqkLLtsxQR-WedYj38pgyOmCz5LL7BtZ3TndWvwy8FpniP4T91WEhQfhriBVW5jAKUwdXuNlN5D9lVIFLCM0uGHwVdIIHfpqHjo6c6kB2PcFD3LoVsWuEQC1P79j0BZ44muqXyKsaZq3RE3jIi2AZa1XDRgrLaQ',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjh04Izf55HdQY-Wseam08C1p3XvDN_1GgqvUhZVBavDrghKbOqxDQHEkJk56vRJrqJipCQBTEtP14sEHcPf0wnZI14lKmUlcfw35i9K876CLr9nmPBqiiRwGLfjV__rcwGhmHw1eAJCyeRN3DE6D5gBvpl1N2r2ixqIDUwIiyir_5DnHVIrSxkJssQgWh9eUC6uyQGbMAz5VV8Vu7oUk41Ilym2kwCVc9a1pX56dDW75eWrPtuf6ry4gyVLFvqlNe7W4h2o9nrvMmKDzqNKgZO08-DYcwPZftB-pO9kH52SrGarhuXcMWB3II9LM5_bGRY6dG1oFOwKRhTMFkw32A',
  ];
  const not_exist_user_valid_token = new Array(10)
    .fill(1)
    .map(createUser)
    .map(tokenService.getAccessToken);

  export const test_get_profile = (connection: IConnection) => () => {
    it.each(invalid_tokens)(
      'If token invalid',
      getProfile.test_invalid_token(connection),
    );

    it.each(valid_tokens)('If user exist', getProfile.test_success(connection));

    it.each(not_exist_user_valid_token)(
      'If user not exist',
      getProfile.test_user_not_found(connection),
    );
  };

  export const test_update_profile = (connection: IConnection) => () => {
    const test_bodys = user_list.map(
      typia.createRandom<IUserUsecase.UpdateData>(),
    );

    it.each(invalid_tokens)('If token invalid', (token) =>
      updateProfile.test_invalid_token(connection)(token)(test_bodys[0]),
    );

    it.each(not_exist_user_valid_token)('If user not exist', (token) =>
      Promise.all(
        test_bodys.map(updateProfile.test_success(connection)(token)),
      ),
    );

    it.each(user_list)('If user exist', async (user) => {
      const token = tokenService.getAccessToken(user);
      for (const body of test_bodys) {
        await updateProfile.test_success(connection)(token)(body);

        for (const [key, value] of Object.entries(body)) {
          if (value !== undefined)
            expect(user[key as keyof IUserUsecase.UpdateData]).toBe(value);
        }
      }
    });
  };

  export const test_user_inactivate = (connection: IConnection) => () => {
    it.each(invalid_tokens)(
      'If token invalid',
      inActivate.test_invalid_token(connection),
    );

    it.each(valid_tokens)(
      'If token valid',
      inActivate.test_success(connection),
    );
  };
}
