import { SignInController } from './presentation/sign-in.controller';
import { Module } from '@nestjs/common';
import { GithubProvider, GoogleProvider } from './guard';
import { AccountServiceProvider, AccountUsecaseProvider } from './application';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<IEnv, true>) {
        return {
          privateKey: config.get('ACCESS_TOKEN_PRIVATEKEY'),
          signOptions: {
            expiresIn: config.get('ACCESS_TOKEN_EXPIRESIN'),
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  providers: [
    GoogleProvider,
    GithubProvider,
    AccountServiceProvider,
    AccountUsecaseProvider,
  ],
  controllers: [SignInController],
})
export class AccountModule {}
