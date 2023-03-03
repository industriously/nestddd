import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenServiceToken } from './constants';
import { providers } from './providers';

@Module({
  imports: [JwtModule.register({ signOptions: { algorithm: 'RS256' } })],
  providers,
  exports: [TokenServiceToken],
})
export class TokenModule {}
