import { ThrowThenMarker } from '@COMMON/decorator/lazy';
import { HttpExceptionFactory } from '@COMMON/exception';
import { IEnv } from '@INTERFACE/common';
import { ITokenService, TokenSchema } from '@INTERFACE/token';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProviderBuilder } from '@UTIL';
import { pipe } from 'rxjs';
import typia from 'typia';
import { TokenMapper } from '../domain/token.mapper';

export const TokenServiceFactory = (
  jwtService: JwtService,
  config: ConfigService<IEnv, true>,
): ITokenService => {
  const throwthen = ThrowThenMarker(() => {
    throw HttpExceptionFactory('BadRequest', '잘못된 토큰입니다.');
  });

  return ProviderBuilder<ITokenService>({
    getAccessToken(aggregate) {
      return pipe(TokenMapper.toAccessTokenPayload, (payload) =>
        jwtService.sign(payload, {
          expiresIn: '8h',
          privateKey: config.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
        }),
      )(aggregate);
    },

    getAccessTokenPayload(token) {
      const payload = jwtService.verify(token, {
        publicKey: config.get<string>('ACCESS_TOKEN_PUBLIC_KEY'),
      });
      return typia.assertPrune<TokenSchema.AccessTokenPayload>(payload);
    },

    getRefreshToken(aggregate) {
      return pipe(
        TokenMapper.toRefreshTokenPayload,

        (payload) =>
          jwtService.sign(payload, {
            expiresIn: '30w',
            privateKey: config.get<string>('REFRESH_TOKEN_PRIVATE_KEY'),
          }),
      )(aggregate);
    },

    getRefreshTokenPayload(token) {
      const payload = jwtService.verify(token, {
        publicKey: config.get<string>('REFRESH_TOKEN_PUBLIC_KEY'),
      });

      return typia.assertPrune<TokenSchema.RefreshTokenPayload>(payload);
    },

    getIdToken(aggregate) {
      return pipe(
        TokenMapper.toIdTokenPayload,

        (payload) =>
          jwtService.sign(payload, {
            expiresIn: '1d',
            privateKey: config.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
          }),
      )(aggregate);
    },

    getIdTokenPayload(token) {
      const payload = jwtService.verify(token, {
        publicKey: config.get<string>('ACCESS_TOKEN_PUBLIC_KEY'),
      });

      return typia.assertPrune<TokenSchema.IdTokenPayload>(payload);
    },
  })
    .mark('getAccessTokenPayload', throwthen)
    .mark('getRefreshTokenPayload', throwthen)
    .mark('getIdTokenPayload', throwthen)
    .build();
};
