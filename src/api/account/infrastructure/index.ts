import { AccountToken } from '@ACCOUNT/constant';
import { Repository } from '@INTERFACE/account';
import { Provider } from '@nestjs/common';
import { AccountRepository } from './account.repository';

export const AccountRepositoryProvider: Provider<Repository> = {
  provide: AccountToken.Repository,
  useClass: AccountRepository,
};
