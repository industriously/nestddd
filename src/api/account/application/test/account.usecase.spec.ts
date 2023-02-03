import { AuthException } from '@devts/nestjs-auth';
import { IAccountService, IAccountUsecase } from '@INTERFACE/account';
import { AccountUsecase } from '../account.usecase';

describe('AccountUsecase', () => {
  const accountService: Record<keyof IAccountService, jest.Mock> = {
    findOne: jest.fn(),
    findOneOrCreate: jest.fn(),
  };
  const usecase: IAccountUsecase = new AccountUsecase(accountService);

  afterEach(() => {
    accountService.findOne.mockClear();
    accountService.findOneOrCreate.mockClear();
  });

  it('signIn success', async () => {
    accountService.findOneOrCreate.mockResolvedValueOnce({ id: 'id' });
    const received = await usecase.signIn({} as any);
    expect(received).toEqual({ id: 'id' });
  });

  it('signIn fail', async () => {
    accountService.findOneOrCreate.mockRejectedValueOnce(
      new Error('test error'),
    );
    const received = usecase.signIn({} as any);

    await expect(received).rejects.toEqual(
      new AuthException(401, '회원 인증에 실패했습니다.'),
    );
  });
});
