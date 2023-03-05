import { HttpExceptionMessage } from '@COMMON/exception';
import { IConnection } from '@nestia/fetcher';
import { HttpStatus } from '@nestjs/common';
import { test_error, validator_invalid_token } from 'src/api/__tests__/common';
import { token } from 'src/sdk/functional';
import typia from 'typia';

export namespace refresh {
  const api = (connection: IConnection) => (refresh_token: string) => {
    const { host, headers } = connection;
    return token.refresh.refreshToken({
      host,
      headers: { ...headers, Authorization: `bearer ${refresh_token}` },
    });
  };
  export const test_success =
    (connection: IConnection) => async (token: string) => {
      const received = await api(connection)(token);

      typia.assertEquals(received);
    };

  export const test_invalid_token = (connection: IConnection) =>
    test_error(test_success(connection))(validator_invalid_token);

  export const test_user_not_exist = (connection: IConnection) =>
    test_error(test_success(connection))((err) => {
      expect(err.status).toBe(HttpStatus.NOT_FOUND);
      expect(err.message).toEqual(HttpExceptionMessage.NF);
    });
}
