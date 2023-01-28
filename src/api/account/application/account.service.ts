import type { Account, IAccountService } from '@INTERFACE/account';
import type { IProfile } from '@INTERFACE/common';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@PRISMA/service';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne({ id }: IAccountService.FindOneFilter): Promise<Account.State> {
    return throw_if_null(
      await this.prisma.accounts.findFirst({ where: { id } }),
      HttpExceptionFactory('UnAuthorized'),
    );
  }

  async findOneOrCreate(profile: IProfile): Promise<Account.State> {
    const { sub, oauth_type, email } = profile;
    return this.prisma.$transaction(async (tx) => {
      const delegate = tx.accounts;
      const account = await delegate.findFirst({
        where: { OR: [{ sub, oauth_type }, { email }] },
      });
      return account ?? delegate.create({ data: profile });
    });
  }
}
