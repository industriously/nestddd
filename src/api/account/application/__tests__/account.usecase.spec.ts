import { AuthException } from '@devts/nestjs-auth';
import { Service, Usecase } from '@INTERFACE/account';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { AccountUsecase } from '../account.usecase';
import { factory } from './mock-factory';

describe('AccountUsecase', () => {
  const service = mockDeep<Service>();
  const usecase: Usecase = new AccountUsecase(service);

  afterEach(() => {
    mockReset(service);
  });

  describe('AccountUsecase', () => {
    it('success', async () => {
      service.findOneOrCreate.mockResolvedValueOnce(factory.account);
      const received = await usecase.signIn(factory.profile);
      expect(received).toEqual({ id: factory.account.id });
      return;
    });

    it('fail', async () => {
      service.findOneOrCreate.mockRejectedValueOnce(Error('Test Error'));
      const received = usecase.signIn(factory.profile);
      await expect(received).rejects.toEqual(
        new AuthException(401, '회원 인증에 실패했습니다.'),
      );
      return;
    });
  });
});
