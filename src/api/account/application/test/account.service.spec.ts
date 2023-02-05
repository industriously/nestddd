import { Account, IAccountService } from '@INTERFACE/account';
import { AccountService } from '../account.service';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaService } from '@PRISMA/service';
import { IProfile } from '@INTERFACE/common';
import { Prisma } from '@PRISMA';

describe('AccountService Test', () => {
  const prisma = mockDeep<PrismaService>();
  const transaction = mockDeep<Prisma.TransactionClient>();
  const service: IAccountService = new AccountService(prisma);
  const now = new Date();
  const profile1: IProfile = {
    sub: 'sub',
    oauth_type: 'google',
    email: 'test@test.com',
    username: 'testuser',
  };
  const accuont1: Account.State = {
    id: 'account1',
    ...profile1,
    is_deleted: false,
    created_at: now,
    updated_at: now,
  };

  afterEach(() => {
    mockReset(prisma);
  });

  it('findOne', async () => {
    prisma.accounts.findFirst.mockResolvedValueOnce(accuont1);
    const received = await service.findOne({ id: '' });
    expect(received).toEqual(accuont1);
  });

  describe('findOneOrCreate', () => {
    beforeEach(() => {
      // mockReset(prisma) 때매 매번 다시 추가해야 함
      prisma.$transaction.mockImplementation((cb) => cb(transaction));
    });

    afterEach(() => {
      mockReset(transaction);
    });

    it('account is exist.', async () => {
      transaction.accounts.findFirst.mockResolvedValueOnce(accuont1);
      const received = await service.findOneOrCreate(profile1);

      expect(received).toEqual(accuont1);
      expect(transaction.accounts.create).toBeCalledTimes(0);
    });

    it('account is not exist.', async () => {
      transaction.accounts.findFirst.mockResolvedValueOnce(null);
      transaction.accounts.create.mockResolvedValueOnce(accuont1);
      const received = await service.findOneOrCreate(profile1);

      expect(received).toEqual(accuont1);
      expect(transaction.accounts.create).toBeCalledTimes(1);
    });
  });
});
