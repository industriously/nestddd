import { Module } from '@nestjs/common';
import { TokenModule } from '@TOKEN';
import { AuthUsecase, UserUsecase } from './application';
import { UserRepository } from './infrastructure/user.repository';
import { AuthController, UserController } from './presentation';
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
  imports: [TokenModule],
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
  controllers: [AuthController, UserController],
})
export class UserModule {}
