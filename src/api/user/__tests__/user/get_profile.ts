import { HttpStatus } from '@nestjs/common';
import { IConnection } from '@nestia/fetcher';
import typia from 'typia';
import { user } from 'src/sdk/functional';
import { HttpExceptionMessage } from '@COMMON/exception';
import { test_error, validator_invalid_token } from 'src/api/__tests__/common';

export namespace getProfile {
  const api = (connection: IConnection) => (token: string) => {
    const { host, headers } = connection;
    return user.getProfile({
      host,
      headers: { ...headers, Authorization: `bearer ${token}` },
    });
  };

  export const test_success =
    (connection: IConnection) => async (token: string) => {
      const received = await api(connection)(token);

      typia.assertEquals(received);
    };

  export const test_invalid_token = (connection: IConnection) =>
    test_error(api(connection))(validator_invalid_token);

  export const test_user_not_found = (connection: IConnection) =>
    test_error(api(connection))((err) => {
      expect(err.status).toBe(HttpStatus.NOT_FOUND);
      expect(err.message).toEqual(HttpExceptionMessage.NF);
    });
}
