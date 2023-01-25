import { SignInController } from './presentation/sign-in.controller';
import { Module } from '@nestjs/common';
import { GithubProvider, GoogleProvider } from './guard';

@Module({
  providers: [GoogleProvider, GithubProvider],
  controllers: [SignInController],
})
export class AccountModule {}
