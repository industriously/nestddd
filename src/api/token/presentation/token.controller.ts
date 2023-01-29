import { TokenAPI } from '@INTERFACE/token';
import { Controller, Post } from '@nestjs/common';

@Controller('token')
export class TokenController {
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
  async getCredentials(): Promise<TokenAPI.Credentials> {
    // authorize code  - 로그인 상태, 현재 활성화된 계정인지
    // command code - 토큰 생성 코드
    throw Error('Function is not implemented.');
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
  async refreshToken(): Promise<TokenAPI.AccessToken> {
    // authorize code  - refresh token 유무, 활성화된 계정인지
    // command code - 토큰 생성 코드
    throw Error('Function is not implemented.');
  }
}
