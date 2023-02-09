import { factory } from './mock-factory';
import { Repository, Service } from '@INTERFACE/account';
import { AccountService } from '../account.service';
import { mockReset, mockDeep } from 'jest-mock-extended';

describe('AccountService', () => {
  const repository = mockDeep<Repository>();
  const service: Service = new AccountService(repository);

  afterEach(() => {
    mockReset(repository);
  });

  it('findOne', () => {
    repository.findOne.mockResolvedValueOnce(factory.account);
    return expect(service.findOne('')).resolves.toEqual(factory.account);
  });

  it('findOneOrCreate', () => {
    /**
    beforeEach(() => {
      // mockReset(prisma) 때매 매번 다시 추가해야 함
      prisma.$transaction.mockImplementation((cb) => cb(transaction));
    });

    afterEach(() => {
      mockReset(transaction);
    });
    */
    repository.findOneOrCreate.mockResolvedValueOnce(factory.account);
    return expect(service.findOneOrCreate(factory.profile)).resolves.toEqual(
      factory.account,
    );
  });
});
