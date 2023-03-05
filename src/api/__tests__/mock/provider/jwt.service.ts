import { JwtService } from '@nestjs/jwt';

export const jwtService = new JwtService({
  signOptions: { algorithm: 'RS256' },
});
