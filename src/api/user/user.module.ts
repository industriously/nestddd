import { Module } from '@nestjs/common';
import { AuthUsecase, UserUsecase } from './application';
import { UserRepository } from './infrastructure/user.repository';
import { AuthController } from './presentation';
import {
  GithubStrategy,
  GoogleStrategy,
  GoogleStrategyToken,
  GithubStrategyToken,
} from './_auth_';
import {
  AuthUsecaseToken,
  UserRepositoryToken,
  UserUsecaseToken,
} from './_constants_';

@Module({
  providers: [
    { provide: GoogleStrategyToken, useClass: GoogleStrategy },
    { provide: GithubStrategyToken, useClass: GithubStrategy },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: UserUsecaseToken,
      useClass: UserUsecase,
    },
    {
      provide: AuthUsecaseToken,
      useClass: AuthUsecase,
    },
  ],
  controllers: [AuthController],
})
export class UserModule {}
