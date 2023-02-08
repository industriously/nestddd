import type { IProfile, ISession } from '@INTERFACE/common';
import { Profile } from '@COMMON/decorator';
import { SIGN_IN_SUCCESS_URL } from '@COMMON/constant';
import {
  Get,
  Inject,
  Session,
  UseGuards,
  Controller,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { GithubGuard, GoogleGuard } from '../guard';
import { AccountToken } from '@ACCOUNT/constant';
import { Usecase } from '@INTERFACE/account';

@Controller('oauth')
export class OauthCallback {
  constructor(
    @Inject(AccountToken.Usecase) private readonly usecase: Usecase,
  ) {}

  @UseGuards(GoogleGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('google')
  async callbackFromGoogle(
    @Profile() profile: IProfile,
    @Session() session: ISession,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id }; // 로그인 세션 생성
  }

  @UseGuards(GithubGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('github')
  async callbackFromGithub(
    @Profile() profile: IProfile,
    @Session() session: ISession,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id };
  }
}
