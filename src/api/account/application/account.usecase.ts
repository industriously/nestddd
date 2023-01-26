import { IAccountService, IAccountUsecase } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountServiceToken } from './constant';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    @Inject(AccountServiceToken)
    private readonly accountService: IAccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(profile: IProfile): Promise<IAccountUsecase.SignInResponse> {
    const { id } = await this.accountService.findOneOrCreate(profile);
    const access_token = this.jwtService.sign({ id });
    return { access_token, account_id: id };
  }
}
