import type { IAccountUsecase } from '@INTERFACE/account';
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
import { AccountUsecaseToken } from '../application';
import { GithubGuard, GoogleGuard } from '../guard';

@Controller('oauth')
export class OauthCallback {
  constructor(
    @Inject(AccountUsecaseToken) private readonly usecase: IAccountUsecase,
  ) {}

  @UseGuards(GoogleGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('google')
  async googlecb(
    @Profile() profile: IProfile,
    @Session() session: ISession,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id }; // 로그인 세션 생성
  }

  @UseGuards(GithubGuard)
  @Redirect(SIGN_IN_SUCCESS_URL, HttpStatus.PERMANENT_REDIRECT)
  @Get('github')
  async githubcb(
    @Profile() profile: IProfile,
    @Session() session: ISession,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id };
  }
}
