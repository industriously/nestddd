import { DBClientToken } from '@INFRA/DB';
import { IAuthUsecase, IUserRepository, IUserUsecase } from '@INTERFACE/user';
import { ModuleMetadata, Provider } from '@nestjs/common';
import { TokenServiceToken } from '../token/constants';
import { AuthUsecaseFactory, UserUsecaseFactory } from './application';
import { UserRepositoryFactory } from './infrastructure/user.repository';
import {
  GithubStrategy,
  GithubStrategyToken,
  GoogleStrategy,
  GoogleStrategyToken,
} from './_auth_';
import {
  AuthUsecaseToken,
  UserRepositoryToken,
  UserUsecaseToken,
} from './_constants_';

const GoogleStrategyProvider: Provider<GoogleStrategy> = {
  useClass: GoogleStrategy,
  provide: GoogleStrategyToken,
};
const GithubStrategyProvider: Provider<GithubStrategy> = {
  useClass: GithubStrategy,
  provide: GithubStrategyToken,
};
const UserRepository: Provider<IUserRepository> = {
  inject: [DBClientToken],
  useFactory: UserRepositoryFactory,
  provide: UserRepositoryToken,
};
const UserUsecase: Provider<IUserUsecase> = {
  inject: [UserRepositoryToken, TokenServiceToken],
  useFactory: UserUsecaseFactory,
  provide: UserUsecaseToken,
};
const AuthUsecase: Provider<IAuthUsecase> = {
  inject: [UserRepositoryToken, TokenServiceToken],
  useFactory: AuthUsecaseFactory,
  provide: AuthUsecaseToken,
};

export const providers: ModuleMetadata['providers'] = [
  GoogleStrategyProvider,
  GithubStrategyProvider,
  UserRepository,
  UserUsecase,
  AuthUsecase,
];
