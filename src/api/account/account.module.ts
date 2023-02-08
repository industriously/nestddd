import { SignInController } from './presentation/sign-in.controller';
import { Module } from '@nestjs/common';
import { GithubProvider, GoogleProvider } from './guard';
import { AccountServiceProvider, AccountUsecaseProvider } from './application';
import { OauthCallback } from './presentation/oauth.callback';
import { AccountToken } from './constant';

@Module({
  providers: [
    GoogleProvider,
    GithubProvider,
    AccountServiceProvider,
    AccountUsecaseProvider,
  ],
  controllers: [SignInController, OauthCallback],
  exports: [AccountToken.Service, AccountToken.Usecase],
})
export class AccountModule {}
