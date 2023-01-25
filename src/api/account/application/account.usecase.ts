import { accounts } from '@PRISMA';
import { IAccountService, IAccountUsecase } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@PRISMA/service';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    private readonly accountService: IAccountService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(profile: IProfile): Promise<IAccountUsecase.SignInResponse> {
    const access_token = this.jwtService.sign({});
    return { access_token, account_id: '' };
  }
}
