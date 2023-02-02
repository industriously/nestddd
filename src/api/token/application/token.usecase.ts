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

  async getToken(
    _account: ITokenUsecase.SignInAccount | undefined,
    oidc: boolean,
  ): Promise<TokenAPI.Tokens> {
    const account = await this.accountService.findOne({
      id: throw_if_null(_account, HttpExceptionFactory('UnAuthorized')).id,
    });
    return {
      access_token: this.tokenService.getAccessToken(account),
      ...(oidc ? { id_token: this.tokenService.getIdToken(account) } : {}),
    };
  }
}
