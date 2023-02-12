import { FxUtil } from '@COMMON/util';
import { DBManager } from '@INFRA/DB';
import { Repository, Domain } from '@INTERFACE/account';
import { Injectable } from '@nestjs/common';
import { accounts, Prisma } from '@PRISMA';
import { pipe } from 'rxjs';
import { toAccountState, toAccountStateAsync } from './account.mapper';

@Injectable()
export class AccountRepository implements Repository {
  constructor(private readonly manager: DBManager) {}

  private getAccounts() {
    return this.manager.getClient().accounts;
  }

  async create(data: Repository.CreateData): Promise<Domain.State> {
    return pipe(
      (input: Prisma.accountsCreateInput) =>
        this.getAccounts().create({ data: input }),

      toAccountStateAsync,
    )(data);
  }

  async findOne(
    id: string,
    include_deleted: boolean,
  ): Promise<Domain.State | null> {
    return pipe(
      (where: Prisma.accountsWhereInput) =>
        this.getAccounts().findFirst({ where }),

      async (input: Promise<accounts | null>) =>
        FxUtil.map(toAccountState)(await input),
    )({ id, ...(include_deleted ? {} : { is_deleted: false }) });
  }

  async findOneOrCreate(
    filter: Repository.FindOneOrCreateFilter,
    data: Repository.FindOneOrCreateData,
  ): Promise<Domain.State> {
    const { sub, oauth_type, email } = filter;
    const { username } = data;
    const exist = await this.getAccounts().findFirst({
      where: { OR: [{ sub, oauth_type }, { email }] },
    });

    return exist
      ? exist.is_deleted
        ? this.update(exist.id, { is_deleted: false })
        : toAccountState(exist)
      : this.create({ sub, oauth_type, email, username });
  }

  async findMany(
    filter: Repository.FindManyFilter,
    include_deleted: boolean,
  ): Promise<Domain.State[]> {
    const { oauth_type } = filter;
    return pipe(
      (where: Prisma.accountsWhereInput) =>
        this.getAccounts().findMany({ where }),

      async (input) => FxUtil.Array.map(toAccountState)(await input),
    )({ oauth_type, ...(include_deleted ? {} : { is_deleted: false }) });
  }

  async update(id: string, data: Repository.UpdateData): Promise<Domain.State> {
    return pipe(
      ([where, input]: [
        Prisma.accountsWhereUniqueInput,
        Prisma.accountsUpdateInput,
      ]) => this.getAccounts().update({ where, data: input }),

      toAccountStateAsync,
    )([{ id }, data]);
  }

  async remove(id: string): Promise<void> {
    await this.getAccounts().update({
      where: { id },
      data: { is_deleted: true },
    });
    return;
  }
}
