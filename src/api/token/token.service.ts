import { IEnv } from '@INTERFACE/common';
import { ITokenService } from '@INTERFACE/token';
import { UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import typia from 'typia';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<IEnv, true>,
  ) {}

  getAccessToken(payload: ITokenService.AccessTokenPayload): string {
    return this.jwtService.sign(typia.assertPrune(payload), {
      expiresIn: '8h',
      privateKey: this.config.get('ACCESS_TOKEN_PRIVATE_KEY'),
    });
  }

  getRefreshToken(payload: ITokenService.RefreshTokenPayload): string {
    return this.jwtService.sign(typia.assertPrune(payload), {
      expiresIn: '30w',
      privateKey: this.config.get('REFRESH_TOKEN_PRIVATE_KEY'),
    });
  }

  getIdToken(payload: UserSchema.Detail): string {
    return this.jwtService.sign(typia.assertPrune(payload), {
      expiresIn: '1d',
      privateKey: this.config.get('ACCESS_TOKEN_PRIVATE_KEY'),
    });
  }

  getPayload(
    token: string,
    token_type: ITokenService.TokenType = 'access',
  ): ITokenService.AccessTokenPayload | ITokenService.RefreshTokenPayload {
    const payload = this.jwtService.verify(token, {
      publicKey: this.config.get(
        token_type === 'access'
          ? 'ACCESS_TOKEN_PUBLIC_KEY'
          : 'REFRESH_TOKEN_PUBLIC_KEY',
      ),
    });
    if (token_type === 'access') {
      return typia.assertPrune<ITokenService.AccessTokenPayload>(payload);
    }
    return typia.assertPrune<ITokenService.RefreshTokenPayload>(payload);
  }
}
