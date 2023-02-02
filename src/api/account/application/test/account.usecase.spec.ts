import { IAccountService, IAccountUsecase } from '@INTERFACE/account';
import { AccountUsecase } from '../account.usecase';

describe('AccountUsecase', () => {
  const accountService: IAccountService = {
    findOne(filter) {
      throw new Error('Function not implemented.');
    },
    findOneOrCreate(profile) {
      throw new Error('Function not implemented.');
    },
  };
  const usecase: IAccountUsecase = new AccountUsecase(accountService);

  it('empty test', () => {
    return;
  });
});
