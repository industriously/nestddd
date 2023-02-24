import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFactory } from '@COMMON/exception';
import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { TokenService } from '@TOKEN';
import { UserUsecase } from '@USER/application';
import typia from 'typia';
import { userRepository } from './user.repository.mock';
import { ConfigService } from '@nestjs/config';
import { IEnv } from '@INTERFACE/common';

describe('User Usecase Test', () => {
  const jwtService = new JwtService({ signOptions: { algorithm: 'RS256' } });
  const config: ConfigService<IEnv, true> = {
    get(key: keyof IEnv): string {
      switch (key) {
        case 'ACCESS_TOKEN_PRIVATE_KEY':
        case 'REFRESH_TOKEN_PRIVATE_KEY':
          return process.env.ACCESS_TOKEN_PRIVATE_KEY;
        case 'ACCESS_TOKEN_PUBLIC_KEY':
        case 'REFRESH_TOKEN_PUBLIC_KEY':
          return process.env.ACCESS_TOKEN_PUBLIC_KEY;
      }
      return 'test_env';
    },
  } as any;
  const tokenService = new TokenService(jwtService, config);
  const usecase: IUserUsecase = new UserUsecase(tokenService, userRepository);

  // test data
  const paylaod = typia.random<Pick<UserSchema.Aggregate, 'id'>>();
  const access_token = tokenService.getAccessToken(paylaod);
  const access_token_invalid_data =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.xz9-9NWa0Sorkil-g_S-CYauW13H83RaM96wVQZDMHROoyAUTO7251fLNZg5CfwvawOlL3csqDq5lR3vnoovHQ1eXIVXECUfy9JbjmQa6OQPCwrmGFmMb_ZvQk2qc_0niAxSZ0rkKQULLDkvBh0UZfUxKgifX9f8XNSnnZZqqBdwRoAAEYxzJ2fBqkLLtsxQR-WedYj38pgyOmCz5LL7BtZ3TndWvwy8FpniP4T91WEhQfhriBVW5jAKUwdXuNlN5D9lVIFLCM0uGHwVdIIHfpqHjo6c6kB2PcFD3LoVsWuEQC1P79j0BZ44muqXyKsaZq3RE3jIi2AZa1XDRgrLaQ';

  const access_token_invalid_data_and_secret =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludmFsaWRfaWQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjh04Izf55HdQY-Wseam08C1p3XvDN_1GgqvUhZVBavDrghKbOqxDQHEkJk56vRJrqJipCQBTEtP14sEHcPf0wnZI14lKmUlcfw35i9K876CLr9nmPBqiiRwGLfjV__rcwGhmHw1eAJCyeRN3DE6D5gBvpl1N2r2ixqIDUwIiyir_5DnHVIrSxkJssQgWh9eUC6uyQGbMAz5VV8Vu7oUk41Ilym2kwCVc9a1pX56dDW75eWrPtuf6ry4gyVLFvqlNe7W4h2o9nrvMmKDzqNKgZO08-DYcwPZftB-pO9kH52SrGarhuXcMWB3II9LM5_bGRY6dG1oFOwKRhTMFkw32A';

  describe("get user's public data", () => {
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.getPublic(paylaod.id);

      await expect(received).rejects.toThrowError(
        HttpExceptionFactory('NotFound'),
      );
    });
    it('If user exist', async () => {
      const received = await usecase.getPublic(paylaod.id);

      typia.assertEquals<UserSchema.Public>(received);
    });
  });

  const test_if_invalid_token =
    (usecase: (token: string) => unknown) => (token: string) => {
      const received = () => usecase(token);
      expect(received).toThrowError(); // token error는 동기적으로 발생
    };

  describe("get user's detail data", () => {
    it.each([access_token_invalid_data, access_token_invalid_data_and_secret])(
      'If token invalid',
      test_if_invalid_token(usecase.getDetail),
    );
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
    it.each([access_token_invalid_data, access_token_invalid_data_and_secret])(
      'If token invalid',
      test_if_invalid_token((token: string) =>
        usecase.update(token, {} as any),
      ),
    );
    it('If token valid', async () => {
      await usecase.update(access_token, {} as IUserUsecase.UpdateData);
    });
  });
  describe('remove user', () => {
    it.each([access_token_invalid_data, access_token_invalid_data_and_secret])(
      'If token invalid',
      test_if_invalid_token(usecase.remove),
    );
    it('If token valid', async () => {
      await usecase.remove(access_token);
    });
  });
});
