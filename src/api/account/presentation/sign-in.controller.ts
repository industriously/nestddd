import { Controller, Get, UseGuards } from '@nestjs/common';
import { GithubGuard, GoogleGuard } from '../guard';

@Controller('sign-in')
export class SignInController {
  /**
   * 구글 oauth 인증 API
   *
   * 인증 성공시 로그인 세션을 생성하고 메인 페이지로 이동합니다.
   *
   * 인증 실패시 로그인 실패 페이지로 이동합니다.
   * @tag authentication
   */
  @UseGuards(GoogleGuard)
  @Get('google')
  signInByGoogle() {
    return;
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
  @Get('github')
  signInByGithub() {
    return;
  }
}
