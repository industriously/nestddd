import { Provider } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountUsecase } from './account.usecase';

export const AccountUsecaseToken = Symbol('AccountUsecase');

export const AccountUsecaseProvider: Provider<AccountUsecase> = {
  provide: AccountUsecaseToken,
  useClass: AccountUsecase,
};

export const AccountServiceToken = Symbol('AccountService');

export const AccountServiceProvider: Provider<AccountService> = {
  provide: AccountServiceToken,
  useClass: AccountService,
};
