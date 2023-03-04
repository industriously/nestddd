import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { GithubGuard, GoogleGuard, OauthProfile } from '@USER/_auth_';
import { AuthUsecaseToken } from '@USER/_constants_';
import { Authorization, TypedQuery } from '@COMMON/decorator/http';
import { TypedBody } from '@nestia/core';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthUsecaseToken) private readonly authUsecase: IAuthUsecase,
  ) {}

  /**
   * 로그인 테스트용 api
   *
   * @internal
   */
  @UseGuards(GoogleGuard)
  @Get('sign-in')
  signInTest() {}

  /**
   * 로그인 테스트용 api
   *
   * @internal
   */
  @Get('sign-in/google')
  signInTestCb(@TypedQuery('code') code: string) {
    return code;
  }

  /**
   * 로그인 API
   *
   * 구글 oauth2 인증을 통해 얻은 code를 body를 통해 제공해야 합니다.
   *
   * @tag authentication
   */
  @UseGuards(GoogleGuard)
  @Post('sign-in/google')
  signInGoogle(
    @TypedBody() body: IAuthUsecase.SignInBody,
    @OauthProfile() profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResponse> {
    return this.authUsecase.signIn(profile);
  }

  /**
   * 로그인 API
   *
   * 깃헙 oauth2 인증을 통해 얻은 code를 body를 통해 제공해야 합니다.
   *
   * @tag authentication
   */
  @UseGuards(GithubGuard)
  @Post('sign-in/github')
  signInGithub(
    @TypedBody() body: IAuthUsecase.SignInBody,
    @OauthProfile() profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResponse> {
    return this.authUsecase.signIn(profile);
  }

  /**
   * 인증 토큰 재발행 API
   *
   * Authorization header로 refresh_token을 전달헤야 합니다.
   *
   * @tag authentication
   */
  @Get('token/refresh')
  refreshToken(
    @Authorization('bearer') token: string,
  ): Promise<IAuthUsecase.RefreshResponse> {
    return this.authUsecase.refresh(token);
  }
}
