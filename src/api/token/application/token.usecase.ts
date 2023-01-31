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

  async getCredentials(
    _account: ITokenUsecase.SignInAccount | undefined,
  ): Promise<TokenAPI.Credentials> {
    const account = await this.accountService.findOne({
      id: throw_if_null(_account, HttpExceptionFactory('UnAuthorized')).id,
    });
    return {
      access_token: this.tokenService.getAccessToken(account),
      refresh_token: this.tokenService.getRefreshToken(account),
      id_token: this.tokenService.getIdToken(account),
    };
  }
  async refreshToken(
    _account: ITokenUsecase.SignInAccount | undefined,
    refresh_token: string,
  ): Promise<TokenAPI.AccessToken> {
    const payload = this.tokenService.verifyToken<'refresh'>(refresh_token);
    const { id } = throw_if_null(
      _account,
      HttpExceptionFactory('UnAuthorized'),
    );
    if (id !== payload.id) {
      throw HttpExceptionFactory('Forbidden');
    } // 로그인된 사용자와 refresh_token의 주인이 다를 때

    return {
      access_token: this.tokenService.getAccessToken(
        await this.accountService.findOne({ id }),
      ),
    };
  }
}
