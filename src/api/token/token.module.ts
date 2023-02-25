import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenServiceToken } from './constants';
import { TokenService } from './application/token.service';

@Module({
  imports: [JwtModule.register({ signOptions: { algorithm: 'RS256' } })],
  providers: [{ provide: TokenServiceToken, useClass: TokenService }],
  exports: [TokenServiceToken],
})
export class TokenModule {}
