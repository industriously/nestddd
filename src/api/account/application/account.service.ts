import type { Domain, Service, Repository } from '@INTERFACE/account';
import type { IProfile } from '@INTERFACE/common';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Inject, Injectable } from '@nestjs/common';
import { AccountToken } from '@ACCOUNT/constant';
import { Transaction } from '@COMMON/decorator';

@Injectable()
export class AccountService implements Service {
  constructor(
    @Inject(AccountToken.Repository)
    private readonly repository: Repository,
  ) {}

  async findOne(id: Domain.State['id']): Promise<Domain.State> {
    return throw_if_null(
      await this.repository.findOne(id, false),
      HttpExceptionFactory('UnAuthorized'),
    );
  }

  @Transaction()
  findOneOrCreate(profile: IProfile): Promise<Domain.State> {
    const { sub, oauth_type, email, username } = profile;
    return this.repository.findOneOrCreate(
      { sub, oauth_type, email },
      { username },
    );
  }
}
