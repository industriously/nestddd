import { Controller, Delete, Get, Patch, Session } from '@nestjs/common';
import * as Account from '@INTERFACE/account';
import { ISession } from '@INTERFACE/common';
import { TypedBody } from '@nestia/core';

@Controller('account')
export class AccountController {
  constructor(private readonly usecase: Account.Usecase) {}

  @Get('profile')
  getProfile(@Session() session: ISession): Promise<Account.Usecase.Detail> {
    return this.usecase.getProfile(session.account);
  }

  @Get(':account_id/profile')
  getPublicProfile(): Promise<Account.Usecase.Public> {
    return this.usecase.getPublicProfile();
  }

  @Patch('profile')
  setProfile(
    @Session() session: ISession,
    @TypedBody() body: Account.Usecase.SetProfileData,
  ): Promise<void> {
    return this.usecase.setProfile(session.account, body);
  }

  @Delete()
  deleteAccount(@Session() session: ISession): Promise<void> {
    return this.usecase.deleteAccount(session.account);
  }
}
