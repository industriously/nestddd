import { map } from '@COMMON/util';
import { Repository, Domain } from '@INTERFACE/account';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@PRISMA/service';
import { toAccountState } from './account.mapper';

@Injectable()
export class AccountRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Repository.CreateData): Promise<Domain.State> {
    return toAccountState(await this.prisma.accounts.create({ data }));
  }

  async findOne(
    id: string,
    include_deleted: boolean,
  ): Promise<Domain.State | null> {
    return map(
      await this.prisma.accounts.findFirst({
        where: { id, ...(include_deleted ? {} : { is_deleted: false }) },
      }),
      toAccountState,
    );
  }

  async findOneOrCreate(
    filter: Repository.FindOneOrCreateFilter,
    data: Repository.FindOneOrCreateData,
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
        return toAccountState(exist);
      }
      return toAccountState(
        await accounts.create({ data: { sub, oauth_type, email, username } }),
      );
    });
  }

  async findMany(
    filter: Repository.FindManyFilter,
    include_deleted: boolean,
  ): Promise<Domain.State[]> {
    const { oauth_type } = filter;
    const accounts = await this.prisma.accounts.findMany({
      where: { oauth_type, ...(include_deleted ? {} : { is_deleted: false }) },
    });
    return accounts.map(toAccountState);
  }

  async update(id: string, data: Repository.UpdateData): Promise<Domain.State> {
    return toAccountState(
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
