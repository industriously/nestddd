import { AccountToken } from '@ACCOUNT/constant';
import { Service, Usecase } from '@INTERFACE/account';
import { Provider } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountUsecase } from './account.usecase';

export const AccountUsecaseProvider: Provider<Usecase> = {
  provide: AccountToken.Usecase,
  useClass: AccountUsecase,
};

export const AccountServiceProvider: Provider<Service> = {
  provide: AccountToken.Service,
  useClass: AccountService,
};
