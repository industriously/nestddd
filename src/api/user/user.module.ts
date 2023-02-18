import { Module } from '@nestjs/common';
import { AuthUsecase, UserUsecase } from './application';
import { UserService } from './domain';
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
  UserServiceToken,
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
      provide: UserServiceToken,
      useClass: UserService,
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
