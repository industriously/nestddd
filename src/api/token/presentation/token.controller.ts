import { Authorization } from '@COMMON/decorator';
import { ISession } from '@INTERFACE/common';
import { ITokenUsecase, TokenAPI } from '@INTERFACE/token';
import { Controller, Post, Session } from '@nestjs/common';

@Controller('token')
export class TokenController {
  constructor(private readonly usecase: ITokenUsecase) {}
  /**
   * 사용자 토큰 생성 API
   *
   * * access_token - api 요청시 사용자 인증에 사용
   * * refresh_token - access token 재발급에 사용
   * * id_token - 사용자 프로필 정보를 포함
   * @tag token
   * @returns 생성된 사용자 토큰을 포함한 JSON 데이터
   * @throw 401 로그인 인증 실패
   * @throw 403 사용자 권한 인증 실패
   */
  @Post()
  getCredentials(@Session() session: ISession): Promise<TokenAPI.Credentials> {
    return this.usecase.getCredentials(session.account);
  }

  /**
   * 토큰 재발급 API
   *
   * * access_token - api 요청시 사용자 인증에 사용
   * @tag token
   * @returns 재발급된 사용자 토큰을 포함한 포함한 JSON 데이터
   * @throw 401 로그인 인증 실패
   * @throw 403 사용자 권한 인증 실패
   */
  @Post('refresh')
  async refreshToken(
    @Session() session: ISession,
    @Authorization('bearer') token: string,
  ): Promise<TokenAPI.AccessToken> {
    return this.usecase.refreshToken(session.account, token);
  }
}
