import { JwtService } from '@nestjs/jwt';
import { Service } from '@INTERFACE/token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements Service {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ id }: Service.AccessTokenPayload): string {
    return this.jwtService.sign({ id }, { expiresIn: '8h' });
  }
  getIdToken({ id, email, username }: Service.IdTokenPayload): string {
    return this.jwtService.sign({ id, email, username }, { expiresIn: '1d' });
  }
  verifyToken(token: string): Service.VerifyTokenResponse {
    return this.jwtService.verify(token);
  }
}
