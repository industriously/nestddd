import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '@INTERFACE/token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ id }: ITokenService.AccessTokenPayload): string {
    return this.jwtService.sign({ id }, { expiresIn: '8h' });
  }
  getIdToken({ id, email, username }: ITokenService.IdTokenPayload): string {
    return this.jwtService.sign({ id, email, username }, { expiresIn: '1d' });
  }
  verifyToken(
    token: string,
  ): ITokenService.AccessTokenPayload | ITokenService.IdTokenPayload {
    return this.jwtService.verify(token);
  }
}
