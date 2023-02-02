import { ISession } from '@INTERFACE/common';
import { ITokenUsecase, TokenAPI } from '@INTERFACE/token';
import { Controller, Inject, Post, Session } from '@nestjs/common';
import { TokenUsecaseToken } from '@TOKEN/application';

@Controller('token')
export class TokenController {
  constructor(
    @Inject(TokenUsecaseToken) private readonly usecase: ITokenUsecase,
  ) {}
  /**
   * 사용자 토큰 생성 API
   *
   * * access_token - api 요청시 사용자 인증에 사용
   * * id_token - 사용자 프로필 정보를 포함
   * @tag token
   * @returns 생성된 사용자 토큰을 포함한 JSON 데이터
   * @throw 401 사용자 인증 실패
   * @throw 403 권힌 없음
   */
  @Post()
  getTokens(@Session() session: ISession): Promise<TokenAPI.Tokens> {
    return this.usecase.getToken(session.account, true);
  }

  /**
   * 사용자 인증 토큰 생성 API
   *
   * * access_token - api 요청시 사용자 인증에 사용
   * @tag token
   * @returns 재발급된 사용자 토큰을 포함한 포함한 JSON 데이터
   * @throw 401 사용자 인증 실패
   * @throw 403 권한 없음
   */
  @Post('access_token')
  getAccessToken(@Session() session: ISession): Promise<TokenAPI.Tokens> {
    return this.usecase.getToken(session.account, false);
  }
}
