import { Service } from '@INTERFACE/token';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token.service';

describe('TokenUsecase', () => {
  const secret = 'test_secret';
  const jwtService = new JwtService({ secret });
  const service: Service = new TokenService(jwtService);

  const account = {
    id: 'safsd',
    email: 'testemail',
    username: 'testuser',
    surplus: 'surplus',
  };

  it('get & verify access_token', () => {
    const token = service.getAccessToken(account);
    expect(typeof token).toBe('string');

    const { exp, iat, ...payload } = service.verifyToken(token);

    const lifetime = (exp - iat) / 3600;
    expect(lifetime).toBe(8);
    expect(payload).toEqual({ id: account.id });
  });

  it('get & verfiy id_token', () => {
    const token = service.getIdToken(account);
    expect(typeof token).toBe('string');

    const { exp, iat, ...payload } = service.verifyToken(token);

    const lifetime = (exp - iat) / 3600;
    expect(lifetime).toBe(24);
    expect(payload).toEqual({
      id: account.id,
      email: account.email,
      username: account.username,
    });
  });
});
