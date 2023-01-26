import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { IAccountService } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import { Injectable } from '@nestjs/common';
import { accounts } from '@PRISMA';
import { PrismaService } from '@PRISMA/service';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(filter: IAccountService.FindOneFilter): Promise<accounts> {
    return throw_if_null(
      await this.prisma.accounts.findFirst({ where: filter }),
      HttpExceptionFactory('UnAuthorized'),
    );
  }

  async findOneOrCreate(profile: IProfile): Promise<accounts> {
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
