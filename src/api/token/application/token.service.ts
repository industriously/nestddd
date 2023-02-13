import { JwtService } from '@nestjs/jwt';
import { Service } from '@INTERFACE/token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements Service {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({}: Service.AccessTokenPayload): string {
    return this.jwtService.sign({}, { expiresIn: '8h' });
  }
  getIdToken({}: Service.IdTokenPayload): string {
    return this.jwtService.sign({}, { expiresIn: '1d' });
  }
  verifyToken(token: string): Service.VerifyTokenResponse {
    return this.jwtService.verify(token);
  }
}
