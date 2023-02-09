import { ISession } from '@INTERFACE/common';
import { Usecase } from '@INTERFACE/token';
import { TokenController } from '../token.controller';

describe('TokenController Test', () => {
  const usecase: Usecase = {
    async getTokens(account) {
      return { access_token: 'access_token', id_token: account?.id ?? '' };
    },
    async getAccessToken(account) {
      return { access_token: account?.id ?? '' };
    },
  };
  const session = { account: { id: 'account_id' } } as ISession;
  const controller = new TokenController(usecase);

  it('getTokens', async () => {
    const received = await controller.getTokens(session);
    expect(received).toEqual({
      access_token: 'access_token',
      id_token: 'account_id',
    });
  });
  it('getAccessToken', async () => {
    const received = await controller.getAccessToken(session);
    expect(received).toEqual({
      access_token: 'account_id',
    });
  });
});
