import { AuthGuard } from '@devts/nestjs-auth';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GOOGLEOAUTH } from '../infrastructure/google.strategy';

@Controller()
export class AccountController {
  @UseGuards(AuthGuard(GOOGLEOAUTH))
  @Get('sign-in')
  signIn() {
    return;
  }

  @UseGuards(AuthGuard(GOOGLEOAUTH))
  @Get('oauth/callback')
  callbakc(@Req() req: any) {
    console.log(req['oauth']);
    return 'hello world';
  }
}
