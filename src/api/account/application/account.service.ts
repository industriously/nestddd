import type {
  Account,
  IAccountRepository,
  IAccountService,
} from '@INTERFACE/account';
import type { IProfile } from '@INTERFACE/common';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryToken } from '@ACCOUNT/infrastructure';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(AccountRepositoryToken)
    private readonly repository: IAccountRepository,
  ) {}

  async findOne({ id }: IAccountService.FindOneFilter): Promise<Account.State> {
    return throw_if_null(
      await this.repository.findOne(id, false),
      HttpExceptionFactory('UnAuthorized'),
    );
  }

  findOneOrCreate(profile: IProfile): Promise<Account.State> {
    const { sub, oauth_type, email, username } = profile;
    return this.repository.findOneOrCreate(
      { sub, oauth_type, email },
      { username },
    );
  }
}
