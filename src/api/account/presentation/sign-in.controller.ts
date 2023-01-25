import { ACCESS_TOKEN } from '@COMMON/constant';
import { Profile } from '@COMMON/decorator';
import { AccountAPI, IAccountUsecase } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountUsecaseToken } from '../application';
import { GithubGuard, GoogleGuard } from '../guard';

@Controller()
export class SignInController {
  constructor(
    @Inject(AccountUsecaseToken) private readonly usecase: IAccountUsecase,
  ) {}

  @UseGuards(GoogleGuard)
  @Get('sign-in/google')
  signInGoogle() {
    return;
  }

  @UseGuards(GithubGuard)
  @Get('sign-in/github')
  signInGithub() {
    return;
  }

  @UseGuards(GoogleGuard)
  @Get('oauth/google')
  async googlecb(
    @Profile() profile: IProfile,
    @Session() session: AccountAPI.ISession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccountAPI.SignInResponse> {
    const { access_token, account_id } = await this.usecase.signIn(profile);
    session.account = { id: account_id };
    res.cookie(ACCESS_TOKEN, access_token);
    return { access_token, refresh_token: session.id };
  }

  @UseGuards(GithubGuard)
  @Get('oauth/github')
  async githubcb(
    @Profile() profile: IProfile,
    @Session() session: AccountAPI.ISession,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, account_id } = await this.usecase.signIn(profile);
    session.account = { id: account_id };
    res.cookie(ACCESS_TOKEN, access_token);
    return { access_token, refresh_token: session.id };
  }
}
