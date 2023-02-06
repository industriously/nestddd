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
  const account1: Account.State = {
    id: 'account1',
    ...profile1,
    is_deleted: false,
    created_at: now,
    updated_at: now,
  };
  const account2: Account.State = {
    ...account1,
    id: 'account2',
  };
  const account2_deleted: Account.State = {
    ...account2,
    is_deleted: true,
  };

  afterEach(() => {
    mockReset(prisma);
  });

  it('findOne', async () => {
    prisma.accounts.findFirst.mockResolvedValueOnce(account1);
    const received = await service.findOne({ id: '' });
    expect(received).toEqual(account1);
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
      transaction.accounts.findFirst.mockResolvedValueOnce(account1);
      const received = await service.findOneOrCreate(profile1);

      expect(received).toEqual(account1);
      expect(transaction.accounts.create).toBeCalledTimes(0);
      expect(transaction.accounts.update).toBeCalledTimes(0);
    });

    it('account is exist, but deleted', async () => {
      transaction.accounts.findFirst.mockResolvedValueOnce(account2_deleted);
      transaction.accounts.update.mockResolvedValueOnce(account2);
      const received = await service.findOneOrCreate(profile1);

      expect(received).toEqual(account2);
      expect(transaction.accounts.update).toBeCalledTimes(1);
    });

    it('account is not exist.', async () => {
      transaction.accounts.findFirst.mockResolvedValueOnce(null);
      transaction.accounts.create.mockResolvedValueOnce(account1);
      const received = await service.findOneOrCreate(profile1);

      expect(received).toEqual(account1);
      expect(transaction.accounts.create).toBeCalledTimes(1);
    });
  });
});
