import { Profile } from '@COMMON/decorator';
import { IProfile } from '@INTERFACE/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GithubGuard, GoogleGuard } from '../guard';

@Controller()
export class SignInController {
  @UseGuards(GoogleGuard)
  @Get('sign-in/google')
  signInGoogle() {
    return;
  }

  @UseGuards(GoogleGuard)
  @Get('oauth/google')
  googlecb(@Profile() profile: IProfile) {
    return profile;
  }

  @UseGuards(GithubGuard)
  @Get('sign-in/github')
  signInGithub() {
    return;
  }

  @UseGuards(GithubGuard)
  @Get('oauth/github')
  githubcb(@Profile() profile: IProfile) {
    return profile;
  }
}
