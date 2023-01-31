import { IAccountService } from '@INTERFACE/account';
import { ITokenService, ITokenUsecase } from '@INTERFACE/token';
import { TokenUsecase } from '../token.usecase';

describe('TokenUsecase', () => {
  const tokenService: ITokenService = {
    getAccessToken(payload) {
      return `access_token: ${payload.id}`;
    },
    getIdToken({ id, email, username }) {
      return `id_token: ${id} ${email} ${username}`;
    },
    verifyToken(token) {
      return { id: token };
    },
  };
  const accountService: IAccountService = {
    async findOne({ id }) {
      const now = new Date();
      return {
        id,
        email: 'test@test.com',
        username: 'testuser',
        sub: 'sfew',
        oauth_type: 'google',
        is_deleted: false,
        created_at: now,
        updated_at: now,
      };
    },
    async findOneOrCreate({ sub, oauth_type, email, username }) {
      const now = new Date();
      return {
        id: 'iosemf',
        email,
        username,
        sub,
        oauth_type,
        is_deleted: false,
        created_at: now,
        updated_at: now,
      };
    },
  };

  const usecase: ITokenUsecase = new TokenUsecase(tokenService, accountService);

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('if oidc false, get only access_token.', async () => {
    const id = 'dsfso';
    const account = await accountService.findOne({ id });
    const token = await usecase.getToken(account, false);
    expect(token).toEqual({ access_token: `access_token: ${id}` });
  });

  it('if oidc true, get access_token with id_token', async () => {
    const id = 'dsfadfeaf';
    const account = await accountService.findOne({ id });
    const token = await usecase.getToken(account, true);
    expect(token).toEqual({
      access_token: `access_token: ${account.id}`,
      id_token: `id_token: ${account.id} ${account.email} ${account.username}`,
    });
  });
});
