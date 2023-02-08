import { map } from '@COMMON/util';
import { Account, IAccountRepository } from '@INTERFACE/account';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@PRISMA/service';
import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IAccountRepository.CreateData): Promise<Account.State> {
    return AccountMapper.toAggregate(
      await this.prisma.accounts.create({ data }),
    );
  }

  async findOne(
    id: string,
    include_deleted: boolean,
  ): Promise<Account.State | null> {
    return map(
      await this.prisma.accounts.findFirst({
        where: { id, ...(include_deleted ? {} : { is_deleted: false }) },
      }),
      AccountMapper.toAggregate,
    );
  }

  async findOneOrCreate(
    filter: IAccountRepository.FindOneOrCreateFilter,
    data: IAccountRepository.FindOneOrCreateData,
  ) {
    return this.prisma.$transaction(async ({ accounts }) => {
      const { sub, oauth_type, email } = filter;
      const { username } = data;
      const exist = await accounts.findFirst({
        where: { OR: [{ sub, oauth_type }, { email }] },
      });
      if (exist) {
        if (exist.is_deleted) {
          return accounts.update({
            where: { id: exist.id },
            data: { is_deleted: false },
          });
        }
        return AccountMapper.toAggregate(exist);
      }
      return AccountMapper.toAggregate(
        await accounts.create({ data: { sub, oauth_type, email, username } }),
      );
    });
  }

  async findMany(
    filter: IAccountRepository.FindManyFilter,
    include_deleted: boolean,
  ): Promise<Account.State[]> {
    const { oauth_type } = filter;
    const accounts = await this.prisma.accounts.findMany({
      where: { oauth_type, ...(include_deleted ? {} : { is_deleted: false }) },
    });
    return accounts.map(AccountMapper.toAggregate);
  }

  async update(
    id: string,
    data: IAccountRepository.UpdateData,
  ): Promise<Account.State> {
    return AccountMapper.toAggregate(
      await this.prisma.accounts.update({
        where: { id },
        data,
      }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.prisma.accounts.update({
      where: { id },
      data: { is_deleted: true },
    });
    return;
  }
}
