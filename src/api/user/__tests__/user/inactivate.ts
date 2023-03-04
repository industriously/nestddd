import { IConnection } from '@nestia/fetcher';
import { test_error, validator_invalid_token } from 'src/api/__tests__/common';
import { user } from 'src/sdk/functional';

export namespace inActivate {
  const api = (connection: IConnection) => (token: string) => {
    const { host, headers } = connection;
    return user.inActivate({
      host,
      headers: { ...headers, Authorization: `bearer ${token}` },
    });
  };

  export const test_success = api;

  export const test_invalid_token = (connection: IConnection) =>
    test_error(api(connection))(validator_invalid_token);
}
