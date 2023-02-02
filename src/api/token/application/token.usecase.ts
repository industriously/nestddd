import { AccountServiceToken } from '@ACCOUNT/application';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { IAccountService } from '@INTERFACE/account';
import { ITokenService, ITokenUsecase, TokenAPI } from '@INTERFACE/token';
import { Inject, Injectable } from '@nestjs/common';
import { TokenServiceToken } from './constant';

@Injectable()
export class TokenUsecase implements ITokenUsecase {
  constructor(
    @Inject(TokenServiceToken)
    private readonly tokenService: ITokenService,
    @Inject(AccountServiceToken)
    private readonly accountService: IAccountService,
  ) {}

  private getAccount(account: ITokenUsecase.SignInAccount | undefined) {
    return this.accountService.findOne({
      id: throw_if_null(account, HttpExceptionFactory('UnAuthorized')).id,
    });
  }

  async getTokens(
    _account: ITokenUsecase.SignInAccount | undefined,
  ): Promise<TokenAPI.Tokens> {
    const account = await this.getAccount(_account);
    return {
      access_token: this.tokenService.getAccessToken(account),
      id_token: this.tokenService.getIdToken(account),
    };
  }

  async getAccessToken(
    _account: ITokenUsecase.SignInAccount | undefined,
  ): Promise<TokenAPI.AccessToken> {
    const account = await this.getAccount(_account);
    return {
      access_token: this.tokenService.getAccessToken(account),
    };
  }
}
