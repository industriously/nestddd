import { SIGN_IN_SUCCESS_URL } from '@COMMON/constants';
import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { GithubGuard, GoogleGuard, OauthProfile } from '@USER/_auth_';
import { AuthUsecaseToken } from '@USER/_constants_';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthUsecaseToken) private readonly authUsecase: IAuthUsecase,
  ) {}

  /**
   * 구글 oauth 인증 API
   *
   * 인증 성공시 로그인 세션을 생성하고 메인 페이지로 이동합니다.
   *
   * 인증 실패시 로그인 실패 페이지로 이동합니다.
   * @tag authentication
   */

  @UseGuards(GoogleGuard)
  @Get('sign-in/google')
  signInByGoogle() {}

  /**
   * @internal
   */
  @UseGuards(GoogleGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('oauth/google')
  callbackFromGoogle(@OauthProfile() profile: UserSchema.OauthProfile) {
    return this.authUsecase.signIn(profile);
  }

  /**
   * 깃헙 oauth 인증 API
   *
   * 인증 성공시 로그인 세션을 생성하고 메인 페이지로 이동합니다.
   *
   * 인증 실패시 로그인 실패 페이지로 이동합니다.
   * @tag authentication
   */
  @UseGuards(GithubGuard)
  @Get('sign-in/github')
  signInByGithub() {}

  /**
   * @internal
   */
  @UseGuards(GithubGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('oauth/github')
  callbackFromGithub(@OauthProfile() profile: UserSchema.OauthProfile) {
    return this.authUsecase.signIn(profile);
  }
}
