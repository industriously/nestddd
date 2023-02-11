import { map } from '@COMMON/util';
import { DBManager } from '@INFRA/DB';
import { Repository, Domain } from '@INTERFACE/account';
import { Injectable } from '@nestjs/common';
import { toAccountState } from './account.mapper';

@Injectable()
export class AccountRepository implements Repository {
  constructor(private readonly manager: DBManager) {}

  private getAccounts() {
    return this.manager.getClient().accounts;
  }

  async create(data: Repository.CreateData): Promise<Domain.State> {
    return toAccountState(await this.getAccounts().create({ data }));
  }

  async findOne(
    id: string,
    include_deleted: boolean,
  ): Promise<Domain.State | null> {
    return map(
      await this.getAccounts().findFirst({
        where: { id, ...(include_deleted ? {} : { is_deleted: false }) },
      }),
      toAccountState,
    );
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
    if (exist) {
      if (exist.is_deleted) {
        return this.getAccounts().update({
          where: { id: exist.id },
          data: { is_deleted: false },
        });
      }
      return toAccountState(exist);
    }
    return toAccountState(
      await this.getAccounts().create({
        data: { sub, oauth_type, email, username },
      }),
    );
  }

  async findMany(
    filter: Repository.FindManyFilter,
    include_deleted: boolean,
  ): Promise<Domain.State[]> {
    const { oauth_type } = filter;
    const accounts = await this.getAccounts().findMany({
      where: { oauth_type, ...(include_deleted ? {} : { is_deleted: false }) },
    });
    return accounts.map(toAccountState);
  }

  async update(id: string, data: Repository.UpdateData): Promise<Domain.State> {
    return toAccountState(
      await this.getAccounts().update({
        where: { id },
        data,
      }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.getAccounts().update({
      where: { id },
      data: { is_deleted: true },
    });
    return;
  }
}
