import { IUserService, IUserUsecase } from '@INTERFACE/user';
import { Provider } from '@nestjs/common';
import { UserServiceToken, UserUsecaseToken } from './constants';
import { UserService } from './user.service';
import { UserUsecase } from './user.usecase';

export const UserServiceProvider: Provider<IUserService> = {
  provide: UserServiceToken,
  useClass: UserService,
};

export const UserUsecaseProvider: Provider<IUserUsecase> = {
  provide: UserUsecaseToken,
  useClass: UserUsecase,
};

export { UserServiceToken, UserUsecaseToken };
