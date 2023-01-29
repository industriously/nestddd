import type { IAccountUsecase } from '@INTERFACE/account';
import type { IProfile, ISession } from '@INTERFACE/common';
import type { Response } from 'express';
import { Profile } from '@COMMON/decorator';
import { SIGN_IN_SUCCESS_URL } from '@COMMON/constant';
import {
  Get,
  Inject,
  Session,
  UseGuards,
  Res,
  Controller,
} from '@nestjs/common';
import { AccountUsecaseToken } from '../application';
import { GithubGuard, GoogleGuard } from '../guard';

@Controller('oauth')
export class OauthCallback {
  constructor(
    @Inject(AccountUsecaseToken) private readonly usecase: IAccountUsecase,
  ) {}

  @UseGuards(GoogleGuard)
  @Get('google')
  async googlecb(
    @Profile() profile: IProfile,
    @Session() session: ISession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id }; // 로그인 세션 생성
    return res.redirect(SIGN_IN_SUCCESS_URL);
  }

  @UseGuards(GithubGuard)
  @Get('github')
  async githubcb(
    @Profile() profile: IProfile,
    @Session() session: ISession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { id } = await this.usecase.signIn(profile);
    session.account = { id };
    return res.redirect(SIGN_IN_SUCCESS_URL);
  }
}
