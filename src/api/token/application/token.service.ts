import { ThrowThen } from '@COMMON/decorator/lazy';
import { HttpExceptionFactory } from '@COMMON/exception';
import { IEnv } from '@INTERFACE/common';
import { ITokenService, TokenSchema } from '@INTERFACE/token';
import { UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import typia from 'typia';
import { TokenMapper } from '../domain/token.mapper';

const throw_if_invalid_token = () => {
  throw HttpExceptionFactory('BadRequest', '잘못된 토큰입니다.');
};

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<IEnv, true>,
  ) {}

  getAccessToken(aggregate: UserSchema.Aggregate): string {
    const payload = TokenMapper.toAccessTokenPayload(aggregate);
    return this.jwtService.sign(payload, {
      expiresIn: '8h',
      privateKey: this.config.get('ACCESS_TOKEN_PRIVATE_KEY'),
    });
  }

  getRefreshToken(aggregate: UserSchema.Aggregate): string {
    const payload = TokenMapper.toRefreshTokenPayload(aggregate);
    return this.jwtService.sign(payload, {
      expiresIn: '30w',
      privateKey: this.config.get('REFRESH_TOKEN_PRIVATE_KEY'),
    });
  }

  getIdToken(aggregate: UserSchema.Aggregate): string {
    const payload = TokenMapper.toIdTokenPayload(aggregate);
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      privateKey: this.config.get('ACCESS_TOKEN_PRIVATE_KEY'),
    });
  }

  @ThrowThen(throw_if_invalid_token)
  getAccessTokenPayload(token: string): TokenSchema.AccessTokenPayload {
    const payload = this.jwtService.verify(token, {
      publicKey: this.config.get('ACCESS_TOKEN_PUBLIC_KEY'),
    });
    return typia.assertPrune<TokenSchema.AccessTokenPayload>(payload);
  }

  @ThrowThen(throw_if_invalid_token)
  getRefreshTokenPayload(token: string): TokenSchema.RefreshTokenPayload {
    const payload = this.jwtService.verify(token, {
      publicKey: this.config.get('REFRESH_TOKEN_PUBLIC_KEY'),
    });
    return typia.assertPrune<TokenSchema.RefreshTokenPayload>(payload);
  }

  @ThrowThen(throw_if_invalid_token)
  getIdTokenPayload(token: string): TokenSchema.IdTokenPayload {
    const payload = this.jwtService.verify(token, {
      publicKey: this.config.get('ACCESS_TOKEN_PUBLIC_KEY'),
    });
    return typia.assertPrune<TokenSchema.IdTokenPayload>(payload);
  }
}
