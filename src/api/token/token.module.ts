import { AccountModule } from '@ACCOUNT/account.module';
import { IEnv } from '@INTERFACE/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenServiceProvider, TokenUsecaseProvider } from './application';
import { TokenController } from './presentation/token.controller';

@Module({
  imports: [
    AccountModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<IEnv, true>) {
        return {
          publicKey: config.get('TOKEN_PUBLICKEY'),
          privateKey: config.get('TOKEN_PRIVATEKEY'),
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  providers: [TokenServiceProvider, TokenUsecaseProvider],
  controllers: [TokenController],
})
export class TokenModule {}
