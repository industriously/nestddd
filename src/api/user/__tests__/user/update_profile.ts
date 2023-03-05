import { IUserUsecase } from '@INTERFACE/user';
import { IConnection } from '@nestia/fetcher';
import { test_error, validator_invalid_token } from 'src/api/__tests__/common';
import { user } from 'src/sdk/functional';

export namespace updateProfile {
  const api =
    (connection: IConnection) =>
    (token: string) =>
    (body: IUserUsecase.UpdateData) => {
      const { host, headers } = connection;
      return user.updateProfile(
        {
          host,
          headers: {
            ...headers,
            Authorization: `bearer ${token}`,
          },
        },
        body,
      );
    };

  export const test_success = api;

  export const test_invalid_token =
    (connection: IConnection) => (token: string) =>
      test_error(api(connection)(token))(validator_invalid_token);
}
