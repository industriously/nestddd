import { SignInController } from './presentation/sign-in.controller';
import { Module } from '@nestjs/common';
import { GithubProvider, GoogleProvider } from './guard';
import { AccountServiceProvider, AccountUsecaseProvider } from './application';
import { OauthCallback } from './presentation/oauth.callback';

@Module({
  providers: [
    GoogleProvider,
    GithubProvider,
    AccountServiceProvider,
    AccountUsecaseProvider,
  ],
  controllers: [SignInController, OauthCallback],
})
export class AccountModule {}
