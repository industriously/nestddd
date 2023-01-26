import { Provider } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountUsecase } from './account.usecase';
import { AccountServiceToken, AccountUsecaseToken } from './constant';

export const AccountUsecaseProvider: Provider<AccountUsecase> = {
  provide: AccountUsecaseToken,
  useClass: AccountUsecase,
};

export const AccountServiceProvider: Provider<AccountService> = {
  provide: AccountServiceToken,
  useClass: AccountService,
};

export { AccountUsecaseToken, AccountServiceToken };
