import { AccountToken } from '@ACCOUNT/constant';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import * as Account from '@INTERFACE/account';
import { ISession } from '@INTERFACE/common';
import { Service, Usecase } from '@INTERFACE/token';
import { Inject, Injectable } from '@nestjs/common';
import { TokenServiceToken } from './constants.ts';

@Injectable()
export class TokenUsecase implements Usecase {
  constructor(
    @Inject(TokenServiceToken)
    private readonly tokenService: Service,
    @Inject(AccountToken.Service)
    private readonly accountService: Account.Service,
  ) {}

  private getAccount(account: ISession['account']) {
    const { id } = throw_if_null(account, HttpExceptionFactory('UnAuthorized'));
    return this.accountService.findOne(id);
  }

  async getTokens(_account: ISession['account']): Promise<Usecase.Tokens> {
    const account = await this.getAccount(_account);
    return {
      access_token: this.tokenService.getAccessToken(account),
      id_token: this.tokenService.getIdToken(account),
    };
  }

  async getAccessToken(
    _account: ISession['account'],
  ): Promise<Usecase.AccessToken> {
    const account = await this.getAccount(_account);
    return {
      access_token: this.tokenService.getAccessToken(account),
    };
  }
}
